const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  // 전체 파일을 모두 읽어와야 하므로 느린 동작 & 메모리에 이 데이터를 저장해야함. (data 변수)
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);

    res.end(data);
  });

  // Solution 2 : Streams
  // 이 방법에서는 Backpressure 현상이 발생할 수 있다.
  // 데이터 소스가 데이터를 너무 빠르게 생성하거나 전송하는데,
  // 소비 속도가 이를 따라가지 못할 때 발생할 수 있음.
  // 네트워크 속도가 느린 경우, 네트워크 버퍼가 금방 차고 시스템 메모리 사용량을 증가해 성능 저하가 올 수 있음.
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);

  //   res.statusCode(500);
  //   res.end('File not found');
  // });

  // Solution 3 : pipe operator
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writableDestination)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening...');
});
