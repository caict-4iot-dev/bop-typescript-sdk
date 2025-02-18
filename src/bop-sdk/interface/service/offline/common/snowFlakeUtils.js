/**
 *
 * 名词说明：
 * Twitter_Snowflake
 * SnowFlake的结构如下(每部分用-分开):
 *
 * 0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000
 * A-|--------------------B--------------------------|-------C-------|------D------|
 *
 * A区：1位标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0
 * B区：41位时间截(毫秒级)，注意，41位时间截不是存储当前时间的时间截，而是存储时间截的差值（当前时间截 - 开始时间截)得到的值，
 *      这里的的开始时间截，一般是我们的id生成器开始使用的时间，由我们程序来指定的（如下下面程序IdWorker类的startTime属性）。41位的时间截，可以使用69年，
 *      年T = (1n << 41n) / (1000n * 60n * 60n * 24n * 365n) = 69n
 * C区：10位的数据机器位，可以部署在1024个节点，包括5位datacenterId和5位workerId（2^5 * 2^5 = 1024）
 * D区：12位序列，毫秒内的计数，12位 的计数顺序号支持每个节点每毫秒(同一机器，同一时间截)产生4096个ID序号（2^12=4096）
 * 加起来刚好64位，为一个Long型。
 *
 * SnowFlake的优点是，整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞(由数据ID和机器ID作区分)，并且效率较高。
 * 理论1S内生成的ID数量是 1000*4096 = 4096000（四百零九万六千个）
 * 代码中使用Bigint实现，该类型在Node10.X版本才开始支持，返回出去的结果是Bigint转为String后的字符串类型，toString方法消耗总性能的三分之一时间；
 * 性能测试结果：
 *      生成100W条ID，      约850-1000ms；  如果不toString后再转，  时间约 640-660ms
 *      生成409.6WW条ID，   约3600-3850ms； 如果不toString后再转，  时间约约 2600-2800ms
 */

// ==============================Constructors=====================================
/**
 * 构造函数
 * @param workerId 工作ID (0~31)
 * @param datacenterId 数据标识ID (0~31)
 */
let Snowflake = (function () {
  function Snowflake(_workerId, _dataCenterId) {
    /** 开始时间截 ：2019-12-20 13:52:35 */
    this.twepoch = 1576821155667;

    /** 机器id所占的位数 */
    this.workerIdBits = 5;

    /** 数据标识id所占的位数 */
    this.dataCenterIdBits = 5;

    // this.maxWrokerId = -1 ^ (-1 << this.workerIdBits) // 值为：31

    /** 支持的最大数据标识id，结果是31 */
    // this.maxDataCenterId = -1 ^ (-1 << this.dataCenterIdBits) // 值为：31

    /** 序列在id中占的位数 */
    this.sequenceBits = 12;

    /** 机器ID向左移12位 */
    this.workerIdShift = this.sequenceBits; // 值为：12

    /** 数据标识id向左移17位(12序列id+5机器ID) */
    this.dataCenterIdShift = this.sequenceBits + this.workerIdBits; // 值为：17

    /** 时间截向左移22位( 12序列id + 5机器ID + 5数据ID) */
    this.timestampLeftShift =
      this.sequenceBits + this.workerIdBits + this.dataCenterIdBits; // 值为：22
    // this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits + 10; // 32
    this.sequenceMask = -1 ^ (-1 << this.sequenceBits); //4095
    /** 上次生成ID的时间截 */
    this.lastTimestamp = -1;

    this.workerId = _workerId || 0; // 工作机器ID(0~31)

    this.dataCenterId = _dataCenterId || 0; // 数据标识ID(0~31)
    this.sequence = 0; // 毫秒内序列(0~4095)

    // workerId 校验
    if (this.workerId > ~(-1 << this.workerIdBits) || this.workerId < 0) {
      throw new Error(
        `workerId must be greater than 0 and less than ${~(-1 << this.workerIdBits)}`,
      );
    }
    // dataCenterId 校验
    if (
      this.dataCenterId > ~(-1 << this.dataCenterIdBits) ||
      this.dataCenterId < 0
    ) {
      throw new Error(
        `dataCenterId must be greater than 0 and less than ${~(-1 << this.dataCenterIdBits)}`,
      );
    }
  }
  // ==============================Methods==========================================
  /**
   * 获得下一个ID (该方法是线程安全的)
   * @return SnowflakeId
   */
  Snowflake.prototype.nextId = function () {
    let timestamp = this.timeGen(); // 获取当前时间戳

    // 如果当前时间小于上一次ID生成的时间戳，抛出异常
    if (timestamp < this.lastTimestamp) {
      throw new Error(
        `Clock moved backwards. Refusing to generate id for ${
          this.lastTimestamp - timestamp
        }`,
      );
    }

    // 如果是同一时间生成的，则进行毫秒内序列
    if (this.lastTimestamp === timestamp) {
      // 增加序列号，并应用位掩码以确保其在允许的范围内
      this.sequence = (this.sequence + 1) & this.sequenceMask;

      // 毫秒内序列溢出
      if (this.sequence === 0) {
        // 阻塞到下一个毫秒,获得新的时间戳
        timestamp = this.tilNextMillis(this.lastTimestamp);
      }
    } else {
      // 时间戳改变，毫秒内序列重置
      this.sequence = 0;
    }

    // 上次生成ID的时间截
    this.lastTimestamp = timestamp;

    // 用除法和加法替代位移操作
    let timestampPart =
      (timestamp - this.twepoch) * Math.pow(2, this.timestampLeftShift);
    let dataCenterIdPart =
      this.dataCenterId * Math.pow(2, this.dataCenterIdShift);
    let workerIdPart = this.workerId * Math.pow(2, this.workerIdShift);
    let result =
      timestampPart + dataCenterIdPart + workerIdPart + this.sequence; // 如果 result 超过 JavaScript Number 的最大安全整数，返回一个字符串，避免精度丢失
    return result > Number.MAX_SAFE_INTEGER ? result.toString() : result;
  };

  Snowflake.randomLenNum = function () {
    return singleSnowFlake.nextId();
  };

  Snowflake.getIPAdress = function () {
    let interfaces = require("os").networkInterfaces();
    for (let devName in interfaces) {
      let iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          console.log(alias.address);
          return alias.address;
        }
      }
    }
  };

  Snowflake.getHostName = function () {
    let os = require("os");
    console.log(os.hostname());
    return os.hostname();
  };

  Snowflake.getRangeRandom = function (m, n) {
    return Math.ceil(Math.random() * (n - m + 1) + m - 1);
  };
  Snowflake.getDefaultRangeRandom = function () {
    return this.getRangeRandom(100, 2000);
  };

  /**
   * 阻塞到下一个毫秒，直到获得新的时间戳
   * @param lastTimestamp 上次生成ID的时间截
   * @return 当前时间戳
   */
  Snowflake.prototype.tilNextMillis = function (lastTimestamp) {
    let timestamp = this.timeGen();
    while (timestamp <= lastTimestamp) {
      timestamp = this.timeGen();
    }
    return timestamp;
  };

  /**
   * 返回以毫秒为单位的当前时间
   * @return 当前时间(毫秒)
   */
  Snowflake.prototype.timeGen = function () {
    return Date.now();
  };

  return Snowflake;
})();
// console.log(new Snowflake(1n, 1n).nextId())
var singleSnowFlake = new Snowflake(1, 1);
module.exports = Snowflake;
