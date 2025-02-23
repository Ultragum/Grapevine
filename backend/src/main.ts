import express from 'express';
import * as fs from 'fs';

const app = express();

/*app.get('/videos/:name', (req, res) => {
  
  
  fs.open('./videos/' + req.params.name, 'r', function (err, f) {
    var status;
    if (err) {
      status = 'Video not found';
    } 
    else {
      status = 'Video found';
    }
    console.log(req.params.name);
    res.send(status);
  });

});*/

app.get('/videos/:name', (req, res) => {
  loadVid(req, res);
});

function loadVid(req: any, res: any) {
  const videoPath = './videos/' + req.params.name; // Path to your video file
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
}

export default app;