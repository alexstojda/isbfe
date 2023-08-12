import React, {useEffect} from 'react';
import QRCode from "react-qr-code";
import topImg from './top.png'

function App() {
  const [renderScreenshot, setRenderScreenshot] = React.useState(false);
  const [ban, setBan] = React.useState<number>();
  const [qrValue, setQrValue] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    if (ban && renderScreenshot) {
      const data = {
        "ban": `"${ban}"`,
        "eventID": "ÎLESONIQ"
      }
      // base64 encode data into string
      const dataString = btoa(JSON.stringify(data));
      setQrValue(`01_${dataString}`)
      setError(undefined);
    }
  }, [ban, renderScreenshot]);

  function onSubmit() {
    if (ban && (ban < 200000000 || ban > 599999999)) {
      setError('Invalid number');
    } else {
      setError(undefined);
      setRenderScreenshot(true)
    }
  }

  if (renderScreenshot && qrValue) {
    return (
      <>
        <center>
          <p>Screenshot and crop between the lines</p>
          <hr style={{margin: '1em 0em'}}/>
          <img alt={'top'} src={topImg} style={{width: "100%", maxWidth: '500px'}}/>
          <div style={{height: "auto", marginTop:'10px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '250px', width: "100%"}}>
            <QRCode
              size={256}
              style={{height: "auto", maxWidth: "100%", width: "100%"}}
              value={qrValue}
              viewBox={`0 0 256 256`}
            />
          </div>
          <br/>
          <hr style={{marginTop: '4em'}}/>
          <input type={'button'} value={'Back'} onClick={() => setRenderScreenshot(false)}/>
        </center>
      </>
    );
  } else {
    return (
      <center>
        <div style={{marginTop: '2em', width: '15em'}}>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <input
            type={'number'} value={ban}
            min={'200000000'}
            max={'599999999'}
            onChange={(e) => setBan(parseInt(e.target.value))}
            placeholder={'enter number'}
            style={{width: '100%', height: '2em'}}
          />
          <br/>
          <input
            type={'button'}
            value={'Generate Screenshot'}
            onClick={onSubmit}
            style={{width: '100%', height: '2em', marginTop: '1em'}}
          />
        </div>
      </center>
    )
  }
}

export default App;
