import React, {useEffect} from 'react';
import QRCode from "react-qr-code";
import topImg from './topv2.jpeg';
import midImg from './mid.png';

function App() {
  const [renderScreenshot, setRenderScreenshot] = React.useState(false);
  const [ban, setBan] = React.useState<number>();
  const [name, setName] = React.useState<string>();
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
          <div style={{width: "100%", maxWidth: '500px', height: '50px', backgroundColor: '#002A4B'}}>
            <img alt={'top'} src={topImg} style={{display: 'block', height: '100%', float: 'left', opacity:'0'}}/>
            <span style={{color: '#7E817B', lineHeight: '3em', fontSize: '1.1em'}}>Hi {name}</span>
            <img alt={'top'} src={topImg} style={{display: 'block', height: '100%', float: 'right'}}/>
          </div>
          <img alt={'top'} src={midImg} style={{display: 'block', width: "100%", maxWidth: '500px'}}/>
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
          <p>Crop above this line</p>
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
          <input
            type={'text'} value={name}
            placeholder={'enter first name'}
            onChange={(e) => setName(e.target.value)}
            style={{width: '100%', height: '2em', marginTop: '0.5em'}}
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
