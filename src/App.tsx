import React, { useEffect } from 'react';
import QRCode from "react-qr-code";
import topImg from './top.jpeg';
import midImg from './bottom.jpeg';
import * as banLib from './ban';

function App() {
  const [renderScreenshot, setRenderScreenshot] = React.useState(false);
  const [ban, setBan] = React.useState<number>(banLib.rand());
  const [eventID, setEventID] = React.useState<string>("F1");
  const [qrValue, setQrValue] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    if (ban && renderScreenshot) {
      const data = {
        "ban": `"${ban}"`,
        "eventID": `"${eventID}"`,
      }
      // base64 encode data into string
      const dataString = btoa(JSON.stringify(data));
      setQrValue(`01_${dataString}`)
      setError(undefined);
    }
  }, [ban, renderScreenshot]);

  function onSubmit() {
    if (!banLib.isValid(ban)) {
      setError('number must be in range (200000000, 599999999)');
    } else {
      setError(undefined);
      setRenderScreenshot(true)
    }
  }

  if (renderScreenshot && qrValue) {
    return (
      <>
        <center>
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <img alt={'top'} src={topImg} style={{ display: 'block', width: "100%" }} />
            <div style={{ textAlign: "left", paddingLeft: '29px', color: '#595959', letterSpacing: -0.8, marginTop: '10px', marginBottom: '5px' }} >
              <span style={{ fontWeight: 550, fontSize: 16 }}>Account number:</span> {ban}
            </div>
            <img alt={'top'} src={midImg} style={{ display: 'block', width: "100%" }} />
            <div style={{ height: "auto", marginTop: '10px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '160px', width: "100%" }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrValue}
                viewBox={`0 0 256 256`}
              />
            </div>
            <br />
            <hr style={{ marginTop: '4em' }} />
            <p>Crop above this line</p>
            <input type={'button'} value={'Back'} onClick={() => setRenderScreenshot(false)} />
          </div>
        </center>
      </>
    );
  } else {
    return (
      <center>
        <div style={{ marginTop: '2em', width: '15em' }}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label style={{ display: 'block' }}>
            Number:
            <input
              type={'number'} value={ban}
              min={'200000000'}
              max={'599999999'}
              onChange={(e) => setBan(parseInt(e.target.value))}
              placeholder={'enter number'}
              style={{ width: '100%', height: '2em', margin: 0, padding: 0 }}
            />
          </label>
          <label style={{ display: 'block', marginTop: '0.5em' }}>
            Event ID:
            <input
              type={'text'} value={eventID}
              onChange={(e) => setEventID(e.target.value)}
              style={{ width: '100%', height: '2em', padding: 0 }}
            />
          </label>
          <div style={{ marginTop: '1em' }}>
            <input
              type={'button'}
              value={'Reset'}
              onClick={() => {
                window.location.reload();
              }}
              style={{ width: '30%', height: '2em' }}
            />
            <input
              type={'button'}
              value={'Generate Screenshot'}
              onClick={onSubmit}
              style={{ width: '70%', height: '2em', }}
            />
          </div>
        </div>
      </center>
    )
  }
}

export default App;
