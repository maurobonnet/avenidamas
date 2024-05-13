import M from 'materialize-css';
import { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Store = createContext(null);
export const PaymentFormLeft = () => {
  const { data, setData } = useContext(Store);
  const inputFocusHandler = (event) => setData({...data, focused: event.target.name});
  const changeHandler = (event) => setData({...data, [event.target.name]: event.target.value});

  useEffect(() => {
    const selectElements = document.querySelectorAll('select');
    M.FormSelect.init(selectElements);
  }, []);

  return (
    <>
        <div className="col s8 card grey lighten-5">
        <div className='row'>
            <div className='container'>
                <h5>¿Cómo quieres pagar?</h5>
                <p>Ingresa los datos de tu tarjeta</p>
            </div>
            <div className='col s6'>
            <div className="row">
                <Input colSize={12} label="Número de tarjeta" id="numberInCard" onChange={changeHandler} onFocus={inputFocusHandler} onBlur={() => validateFields(data)} name='number' type="text" className="validate" />
                <Input colSize={12} label="Nombre en la tarjeta" id="nameInCard" onChange={changeHandler} onFocus={inputFocusHandler} onBlur={() => validateFields(data)} name='name' type="text" className="validate" />
                <Input colSize={6} label="Fecha de expiración (MM/AA)" id="expiry" onChange={changeHandler} onFocus={inputFocusHandler} onBlur={() => validateFields(data)} name='expiry' type="text" className="validate" />
                <Input colSize={6} label="CVC" id="cvc" onChange={changeHandler} onFocus={inputFocusHandler} onBlur={() => validateFields(data)} name='cvc' min={3} max={4} type="text" className="validate" />
                <Input colSize={12} label="DNI" id="dni" onChange={changeHandler} onFocus={inputFocusHandler} onBlur={() => validateFields(data)} name='dni' type="text" className="validate" />
            </div>
            </div>
            <div className='col s6'>
            <Cards
                number={data.number}
                name={data.name}
                expiry={data.expiry}
                cvc={data.cvc}
                focused={data.focused}
            />
            </div>
        </div>
        </div>
    </>
  );
};

const Input = ({ label, id, name, colSize, ...rest }) => (
  <>
    <div className={`input-field col s${colSize}`}>
        <input id={id} name={name} {...rest} />
        <label htmlFor={id}>{label}</label>
    </div>
  </>
);
export const PaymentFormRight = () => {
    const { data, setData } = useContext(Store);
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const res = await axios.post("/add", {
            number: data.number,
            name: data.name,
            expiry: data.expiry,
            cvc: data.cvc,
            dni: data.dni,
            amount: 5000
        });
        const {result} = res.data;
        if(!result) M.toast({html: 'Hubo un error, intenta de nuevo', classes: 'red'});
        if(result.status === "approved"){
            M.toast({html: 'Gracias por tu compra', classes: 'green'});
            setTimeout(() => {window.location.pathname = "/payments"}, 3000);
        }else{
            M.toast({html: res.data.message, classes: 'red'});
        }
    };
    return (
        <>
            <div className="col s4 card grey lighten-5">
                <div style={{ padding: '20px' }}>
                    <b>Detalles de la orden</b>
                    <div className='row'>
                        <div className="left-align">
                            Productos (4)
                        </div>
                        <div className="right-align">
                            $150.000
                        </div>
                        <div className="left-align">
                            Costo de envio
                        </div>
                        <div className="right-align">
                            $700
                        </div>
                        <div className='divider'></div>
                        <div className="left-align">
                            Subtotal
                        </div>
                        <div className="right-align">
                            $150.700
                        </div>
                        <div className="left-align">
                            Intereses
                        </div>
                        <div className="right-align">
                            $0
                        </div>
                        <div className="left-align">
                            Total
                        </div>
                        <div className="right-align">
                            $150.700
                        </div>
                        <div>
                            <label>
                                <input onChange={() => setData({ ...data, conditions: !data.conditions })} checked={data.conditions} type="checkbox" />
                                <span>Acepto los términos y condiciones</span>
                            </label>
                        </div>
                        <button onClick={onSubmitHandler} disabled={!data.conditions} type="submit" className="btn waves-effect waves-light" style={{ width: '100%' }}>Pagar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export const PaymentForm = () => {
    const [data, setData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        dni: '',
        conditions: true,
        focused: false,
    });

    return (
        <>
            <div className="row">
                <form>
                    <Store.Provider value={{ data, setData }}>
                        <PaymentFormLeft />
                        <PaymentFormRight />
                    </Store.Provider>
                </form>
            </div>
        </>
    );
}

const validateFields = (data) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const fields = {
        number: () => data.number.length < 16 || data.number.length > 16 ? M.toast({html: 'El numero de tarjeta es invalido', classes: 'red'}) : null,
        name: () => data.name.length < 3 ? M.toast({html: 'Ingresa un nombre valido', classes: 'red'}) : null,
        expiry: () => (!regex.test(data.expiry)) ? M.toast({html: 'Ingresa una fecha formato MM/AA', classes: 'red'}) : null,
        cvc: () => data.cvc.length < 3 ? M.toast({html: 'Ingresa un cvc valido', classes: 'red'}) : null,
        dni: () => data.dni.length < 5 ? M.toast({html: 'Ingresa un dni valido', classes: 'red'}) : null,
    }
    fields[data.focused]();
}