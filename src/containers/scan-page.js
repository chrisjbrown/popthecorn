import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/button';
import Container from 'app/components/container';
import Quagga from 'quagga';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

Quagga.onDetected((data) => {
  Quagga.stop();
  console.log(data);
});

Quagga.onProcessed((result) => {
  const drawingCtx = Quagga.canvas.ctx.overlay;
  const drawingCanvas = Quagga.canvas.dom.overlay;

  if (result) {
    if (result.boxes) {
      drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
      result.boxes.filter((box) => {
        return box !== result.box;
      }).forEach((box) => {
        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
      });
    }

    if (result.box) {
      Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
    }

    if (result.codeResult && result.codeResult.code) {
      Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
    }
  }
});

const startScan = () => {
  Quagga.init({
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: document.querySelector('#scanArea'),
      constraints: {
        width: 640,
        height: 480,
        facingMode: 'environment',
      },
    },
    locator: {
      patchSize: 'medium',
      halfSample: true,
    },
    numOfWorkers: 4,
    decoder: {
      readers: ['ean_reader'],
    },
    locate: true,
  }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Initialization finished. Ready to start');
    Quagga.start();
  });
};

const stopScan = () => {
  Quagga.stop();
};

class ScanPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container size={4} center>
        <h2 className="caps">
          Scan
        </h2>

        <Button onClick={startScan.bind(this)} className="mr2">
          Start Scan
        </Button>
        <Button onClick={stopScan.bind(this)}>
          Stop Scan
        </Button>

        <div id="scanArea">
        </div>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanPage);
