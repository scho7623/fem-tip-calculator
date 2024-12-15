const App = () => {
  const [ bill, setBill ] = React.useState('142.55');
  const [ tip, setTip ] = React.useState('15');
  const [ people, setPeople ] = React.useState('5');

  const billHandler = React.useCallback((e) => {
    setBill(e.target.value.replace(/[^0-9\.]/g, ''));
  }, []);

  const peopleHandler = React.useCallback((e) => {
    setPeople(e.target.value.replace(/[^0-9]/g, ''));
  }, []);

  const resetHandler = React.useCallback(() => {
    setBill('');
    setTip('');
    setPeople('');
  }, []);

  const tipAmount = React.useMemo(() => {
    if (bill && tip && people) {
      return Number(tip) / 100 * Number(bill) / Number(people);
    }
    return 0;
  }, [bill, tip, people]);

  const totalAmount = React.useMemo(() => {
    if (bill && tip && people) {
      return (Number(tip) / 100 + 1) * Number(bill) / Number(people);
    }
    return 0;
  }, [bill, tip, people]);

  return (
    <div className="container">
      <header>
        <h1>SPLITTER</h1>
        <img src="./images/logo.svg" alt="Splitter logo" />
      </header>
      <div className="calculator">
        <div className="form">
          <Input id="bill" label="Bill" value={bill} onChange={billHandler} />
          <Tips value={tip} onChange={setTip} />
          <Input id="people" label="Number of People" value={people} onChange={peopleHandler} />
        </div>
        <div className="display">
          <div className="tip">
            <div className="label">
              <span>Tip Amount</span>
              <span>/ person</span>
            </div>
            <div className="amount">
              {`\$${tipAmount.toFixed(2)}`}
            </div>
          </div>
          <div className="total">
            <div className="label">
              <span>Total</span>
              <span>/ person</span>
            </div>
            <div className="amount">
              {`\$${totalAmount.toFixed(2)}`}
            </div>
          </div>
          <button className="reset" onClick={resetHandler}>RESET</button>
        </div>
      </div>
    </div> 
  );
};

const inputIcon = {
  bill: './images/icon-dollar.svg',
  people: './images/icon-person.svg',
};

const Input = ({ id, label, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input className={id} id={id} value={value} placeholder="0" onChange={onChange} />
    </div>
  );
}

const Tips = ({ value, onChange }) => {
  const tipHandler = (e) => {
    onChange(e.target.value);
  };

  const customHandler = (e) => {
    onChange(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <fieldset className="tips-container" onChange={tipHandler}>
      <legend>Select Tip %</legend>
      <div class="radio-group">
        <label className={value === '5' ? 'checked' : ''}>
          <input type="radio" name="tip" value="5" />5%
        </label>
        <label className={value === '10' ? 'checked' : ''}>
          <input type="radio" name="tip" value="10" />10%
        </label>
        <label className={value === '15' ? 'checked' : ''}>
          <input type="radio" name="tip" value="15" />15%
        </label>
        <label className={value === '25' ? 'checked' : ''}>
          <input type="radio" name="tip" value="25" />25%
        </label>
        <label className={value === '50' ? 'checked' : ''}>
          <input type="radio" name="tip" value="50" />50%
        </label>
      <input id="custom-tip" placeholder="Custom" value={value} onChange={customHandler} />
    </div>
    </fieldset>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
