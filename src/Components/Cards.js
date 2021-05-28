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
    /* Инцилизация Holder.js */
    useEffect(() => {runHolder('carimg');});

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);

        const onChange = (e) => {
            setValue(e.target.value)
        }

        const onClick = (e) => {
            setValue(e)
        }

        return{
            value,
            onChange,
            onClick
        }
    }
    const name = useInput("")
    const body = useInput("")
    const colorBg = useInput("light");
    const colorBr = useInput("light");
    const column = useInput("");
    const buttonsText = useInput("");
    const buttonsColor = useInput("");
    const [show, setShow] = useState(false);
    const [cardArray, setCardArray] = useState([
        {
            name: "Карточка 1",
            body: "Тело карточки",
            colorBg: "light",
            colorBr: "",
            column: "",
            buttons: [{text: "Кнопка", color: "primary"}]
        },
        {
            name: "Карточка 2",
            body: "Тело карточки",
            colorBg: "light",
            colorBr: "",
            column: "",
            buttons: [{text: "Кнопка", color: "primary"}]
        }]);
    const [buttons, setButtons] = useState([]);
    const [alertText, setAlertText] = useState("");
    const colors = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',]

    const mapCards = React.useMemo(
        () =>
            cardArray.map((variant, id) => {
                return (
                    <Col key={id} md={variant.column} style={{paddingBottom: '15px'}}>
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
                                    cardArray.splice(id, 1)
                                    setCardArray([...cardArray])
                                    setShow(true)
                                    setAlertText("Карточка удалена")
                                }
                                } className="ml-3" variant="danger">Удалить</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }),
        [cardArray]
    )
    return (
        <>
            <h2 className="text-center">Редактор карточек</h2>
            <Row className="pb-3 m-0">
                <Col lg={4}>
                    <h4 className="text-center">Заголовок карточки </h4>
                    <div className="text-center mb-3"><input placeholder="Карточка 1" type="text" onChange={e => name.onChange(e)}/></div>
                    <h5 className="text-center">Содержимое карточки</h5>
                    <div className="text-center mb-3"><textarea placeholder="Бла-бла-бла" rows="3" cols="35" onChange={e => body.onChange(e)}/></div>
                </Col>
                <Col lg={4}>
                    <h5 className="text-center">Цвет тела карточки:</h5>
                    <ButtonGroup className="d-block text-center">
                        {
                            colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    colorBg.onClick(variant.toLowerCase())
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
                            colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    colorBr.onClick(variant.toLowerCase())
                                    setAlertText("Выбран цвет обводки " + variant.toLowerCase())
                                    setShow(true)
                                }}>{variant}</Button>
                            ))
                        }
                    </ButtonGroup>
                    <h5 className="text-center">Колонны, занимаемые карточкой:</h5>
                    <div className="text-center "><input className="w-25 text-center" placeholder="От 1 до 12" type="text" onChange={e => column.onChange(e)}/></div>
                </Col>
                <Col lg={4}>
                    <h4 className="text-center">Добавить кнопки </h4>
                    <h5 className="text-center">Текст кнопки:</h5>
                    <div className="text-center "><input className="w-25 text-center" placeholder="Кнопка" type="text" onChange={e => buttonsText.onChange(e)}/></div>
                    <h5 className="text-center">Цвет кнопки:</h5>
                    <ButtonGroup className="d-block text-center">
                        {
                            colors.map((variant, id) => (
                                <Button key={id}
                                        variant={variant.toLowerCase()}
                                        onClick={() => {
                                    buttonsColor.onClick(variant.toLowerCase())
                                    setAlertText("Выбран цвет " + variant.toLowerCase())
                                    setShow(true)
                                        }
                                        }
                                >{variant}</Button>))
                        }
                    </ButtonGroup>
                    <Button className="mr-auto ml-auto mt-2 d-block" variant="success" onClick={() => {
                        setButtons([...buttons, {text: buttonsText.value, color: buttonsColor.value}])
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
            <Card className="w-50 m-auto" bg={colorBg.value} text={colorBg.value === 'light' ? 'dark' : 'white'} border={colorBr.value}>
                <Card.Img className="carimg" variant="top" src="holder.js/100px180"/>
                <Card.Body>
                    <Card.Title>{name.value}</Card.Title>
                    <Card.Text>
                        {body.value}
                    </Card.Text>
                    {buttons ? buttons.map((variant, id) => <Button key={id}
                                                                    variant={variant.color}>{variant.text}</Button>) : ""}
                </Card.Body>
            </Card>
            <Button className="d-block mr-auto ml-auto mb-3 mt-3" onClick={
                () => {
                    setCardArray(
                        [...cardArray, {
                            name: name.value,
                            body: body.value,
                            colorBg: colorBg.value,
                            colorBr: colorBr.value,
                            buttons: buttons,
                            column: column.value
                        }]
                    )
                    setShow(true)
                    setAlertText("Карточка успешно добавлена")
                }
            }>Добавить</Button>
            <Row className="m-0 border-top border-dark pt-3">
                {mapCards}
            </Row>
            <Alerts show={show} setShow={setShow} text={alertText}/>
        </>
    )
}
