#协议代码处理
cd src/bop/bop-proto & npx protoc --plugin=/home/ubuntu/.nvm/versions/node/v18.20.4/bin/protoc-gen-ts_proto --ts_proto_out=./ ./\*.proto --ts_proto_opt=useOptionals=all
