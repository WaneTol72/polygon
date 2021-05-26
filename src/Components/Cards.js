import React, {useEffect, useState} from "react";
import {run as runHolder} from "holderjs";
import {Button, ButtonGroup, Card, Col, Row, Toast} from "react-bootstrap";

function Alerts(props) {
    return (
        <>
            <Toast className="position-fixed w-50" style={{bottom: "0", right: "0", zIndex: "1"}} delay={5000}
                   show={props.show} onClose={() => props.setShow(false)} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">Оповещение</strong>
                </Toast.Header>
                <Toast.Body>{props.text}</Toast.Body>
            </Toast>
        </>
    );
}

export function Cards() {
    useEffect(() => {
        runHolder('carimg');
    });

    const [show, setShow] = useState(false);
    const [Array, setArray] = useState([
        {
            name: "Карточка 1",
            body: "Тело карточки",
            colorBg: "light",
            colorBr: "",
            colum: "",
            buttons: [{text: "Кнопка", color: "primary"}]
        },
        {
            name: "Карточка 2",
            body: "Тело карточки",
            colorBg: "light",
            colorBr: "",
            colum: "",
            buttons: [{text: "Кнопка", color: "primary"}]
        }]);
    const [Name, setName] = useState("");
    const [Body, setBody] = useState("");
    const [ColorBg, setColorBg] = useState("light");
    const [ColorBr, setColorBr] = useState("light");
    const [Colum, setColum] = useState("");
    const [Buttons, setButtons] = useState([]);
    const [ButtonsColor, setButtonsColor] = useState("");
    const [ButtonsText, setButtonsText] = useState("");
    const [AlertText, setAlertText] = useState("");
    const Colors = [
        'Primary',
        'Secondary',
        'Success',
        'Danger',
        'Warning',
        'Info',
        'Light',
        'Dark',
    ]

    const mapCards = React.useMemo(
        () =>
            Array.map((variant, id) => {
                return (
                    <Col key={id} md={variant.colum} style={{paddingBottom: '15px'}}>
                        <Card bg={variant.colorBg} text={variant.colorBg === 'light' ? 'dark' : 'white'}
                              border={variant.colorBr}>
                            <Card.Img className="carimg" variant="top" src="holder.js/100px180"/>
                            <Card.Body>
                                <Card.Title>{variant.name}</Card.Title>
                                <Card.Text>
                                    {variant.body}
                                </Card.Text>
                                {variant.buttons.map((variant) => <Button
                                    variant={variant.color}>{variant.text}</Button>)}
                                <Button onClick={() => {
                                    Array.splice(id, 1)
                                    setArray([...Array])
                                    setShow(true)
                                    setAlertText("Карточка удалена")
                                }
                                } className="ml-3" variant="danger">Удалить</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }),
        [Array]
    )
    return (
        <>
            <h2 className="text-center">Редактор карточек</h2>
            <Row className="pb-3">
                <Col lg={4}>
                    <h4 className="text-center">Заголовок карточки </h4>
                    <div className="text-center mb-3"><input placeholder="Карточка 1" type="text"
                                                             onChange={e => setName(e.target.value)}/></div>
                    <h5 className="text-center">Содержимое карточки</h5>
                    <div className="text-center mb-3"><textarea placeholder="Бла-бла-бла" rows="3" cols="35"
                                                                onChange={e => setBody(e.target.value)}/></div>
                </Col>
                <Col lg={4}>
                    <h5 className="text-center">Цвет тела карточки:</h5>
                    <ButtonGroup className="d-block text-center">
                        {
                            Colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    setColorBg(variant.toLowerCase())
                                    setAlertText("Выбран цвет карточки " + variant.toLowerCase())
                                    setShow(true)
                                }
                                }>{variant}</Button>
                            ))
                        }
                    </ButtonGroup>
                    <h5 className="text-center"> Цвет обводки карточки:</h5>
                    <ButtonGroup className="d-block text-center">
                        {
                            Colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    setColorBr(variant.toLowerCase())
                                    setAlertText("Выбран цвет обводки " + variant.toLowerCase())
                                    setShow(true)
                                }}>{variant}</Button>
                            ))
                        }
                    </ButtonGroup>
                    <h5 className="text-center">Ячейки, занимаемые карточкой:</h5>
                    <div className="text-center "><input className="w-25 text-center" placeholder="От 1 до 12"
                                                         type="text" onChange={e => setColum(e.target.value)}/></div>
                    <p className="text-center text-black-50">*В строке 12 ячеек*</p>
                </Col>
                <Col lg={4}>
                    <h4 className="text-center">Добавить кнопки </h4>
                    <h5 className="text-center">Текст кнопки:</h5>
                    <div className="text-center "><input className="w-25 text-center" placeholder="Кнопка" type="text"
                                                         onChange={e => setButtonsText(e.target.value)}/></div>
                    <h5 className="text-center">Цвет кнопки:</h5>
                    <ButtonGroup className="d-block text-center">
                        {
                            Colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    setButtonsColor(variant.toLowerCase())
                                    setAlertText("Выбран цвет " + variant.toLowerCase())
                                    setShow(true)
                                }}>{variant}</Button>))
                        }
                    </ButtonGroup>
                    <Button className="mr-auto ml-auto mt-2 d-block" variant="success" onClick={() => {
                        setButtons([...Buttons, {text: ButtonsText, color: ButtonsColor}])
                        setAlertText("Кнопка успешно добавлена")
                        setShow(true)
                    }
                    }>Добавить кнопку</Button>
                    <Button className="mr-auto ml-auto mt-2 d-block" variant="danger" onClick={() => {
                        setButtons([])
                        setAlertText("Кнопки успешно удалены")
                        setShow(true)
                    }}>Удалить кнопки</Button>
                </Col>
            </Row>
            <h4 className="text-center">Предпросмотр карточки</h4>
            <Card className="w-50 m-auto" bg={ColorBg} text={ColorBg === 'light' ? 'dark' : 'white'} border={ColorBr}>
                <Card.Img className="carimg" variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Card.Title>{Name}</Card.Title>
                    <Card.Text>
                        {Body}
                    </Card.Text>
                    {Buttons ? Buttons.map((variant, id) => <Button key={id}
                                                                    variant={variant.color}>{variant.text}</Button>) : ""}
                </Card.Body>
            </Card>
            <Button className="d-block mr-auto ml-auto mb-3 mt-3" onClick={
                () => {
                    setArray(
                        [...Array, {
                            name: Name,
                            body: Body,
                            colorBg: ColorBg,
                            colorBr: ColorBr,
                            buttons: Buttons,
                            colum: Colum
                        }]
                    )
                    setShow(true)
                    setAlertText("Карточка успешно добавлена")
                }
            }>Добавить</Button>
            <Row className="m-0 border-top border-dark pt-3">
                {mapCards}
            </Row>
            <Alerts show={show} setShow={setShow} text={AlertText}/>
        </>
    )
}
