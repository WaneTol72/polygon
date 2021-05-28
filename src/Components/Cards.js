import React, {useEffect, useState} from "react";
import {run as runHolder} from "holderjs";
import {Button, ButtonGroup, Card, Col, DropdownButton, Image, Row, Toast, Dropdown} from "react-bootstrap";

function Alerts(props) {
    return (
        <>
            <Toast className="position-fixed w-50" style={{bottom: "0", right: "10px", zIndex: "1"}} delay={5000}
                   show={props.show} onClose={() => props.setShow(false)} autohide>
                <Toast.Header>
                    <Image
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
    /* Кастомный хук */
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
    const picSizeY = useInput("180");
    const picSizeZ = useInput("100p");
    const width = useInput("25");
    const buttonsText = useInput("");
    const buttonsColor = useInput("");
    const alertText = useInput("");
    const [show, setShow] = useState(false);
    const [cardArray, setCardArray] = useState([
        {
            name: "Карточка 1",
            body: "Тело карточки",
            colorBg: "light",
            colorBr: "",
            column: "",
            picSizeY: "180",
            picSizeZ: "100p",
            id: 0,
            buttons: [{text: "Кнопка", color: "primary"}]
        },
        {
            name: "Карточка 2",
            body: "Тело карточки",
            colorBg: "light",
            colorBr: "",
            column: "",
            picSizeY: "180",
            picSizeZ: "100p",
            id: 1,
            buttons: [{text: "Кнопка", color: "primary"}]
        }]);
    const [buttons, setButtons] = useState([]);
    const colors = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',]
    const colorSet = useInput("")

    const mapCards = React.useMemo(
        () =>
            cardArray.map((variant, id) => {
                return (
                    <Col key={id} md={variant.column} style={{paddingBottom: '15px', display: variant.colorBg === colorSet.value || colorSet.value === "" ? "block" : "none"}}>
                        <Card bg={variant.colorBg} text={variant.colorBg === 'light' ? 'dark' : 'white'}
                              border={variant.colorBr}>
                            <Card.Img className="carimg" variant="top" src={"holder.js/" + variant.picSizeZ + "x" + variant.picSizeY}/>
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
                                    alertText.onClick("Карточка удалена")
                                }
                                } className="ml-3" variant="danger">Удалить</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }),
        [cardArray, colorSet.value]
    )

    const sortById = (a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    const sortByAlphabet = (a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    function sortByColor(a, b) {
        const lowerCasedColors = colors.map(colors => colors.toLowerCase());
        return lowerCasedColors.indexOf(a.colorBg) - lowerCasedColors.indexOf(b.colorBg)
    }

    return (
        <>
            <h2 className="text-center">Редактор карточек</h2>
            <Row className="pb-3 m-0 text-center">
                <Col lg={4}>
                    <h4>Заголовок карточки </h4>
                    <div className="mb-3"><input placeholder="Карточка 1" type="text" onChange={e => name.onChange(e)}/></div>
                    <h5>Содержимое карточки</h5>
                    <div className="mb-3"><textarea placeholder="Бла-бла-бла..." rows="3" cols="35" onChange={e => body.onChange(e)}/></div>
                    <h5 >Ширина предпросмотра карточки:</h5>
                    <div><input className="w-25 text-center" placeholder="В процентах" type="text" onChange={e => width.onChange(e)}/></div>
                </Col>
                <Col lg={4}>
                    <h5 >Цвет тела карточки:</h5>
                    <ButtonGroup className="d-block">
                        {
                            colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    colorBg.onClick(variant.toLowerCase())
                                    alertText.onClick("Выбран цвет карточки " + variant.toLowerCase())
                                    setShow(true)
                                }
                                }>{variant}</Button>
                            ))
                        }
                    </ButtonGroup>
                    <h5> Цвет обводки карточки:</h5>
                    <ButtonGroup className="d-block">
                        {
                            colors.map((variant, id) => (
                                <Button key={id} variant={variant.toLowerCase()} onClick={() => {
                                    colorBr.onClick(variant.toLowerCase())
                                    alertText.onClick("Выбран цвет обводки " + variant.toLowerCase())
                                    setShow(true)
                                }}>{variant}</Button>
                            ))
                        }
                    </ButtonGroup>
                    <h5>Колонны, занимаемые карточкой:</h5>
                    <div><input className="w-25 text-center" placeholder="От 1 до 12" type="text" onChange={e => column.onChange(e)}/></div>
                    <h5>Размер картинки:</h5>
                    <div>
                        <input className="w-25 text-center" placeholder="100p" type="text" onChange={e => picSizeZ.onChange(e)}/>
                        x
                        <input className="w-25 text-center" placeholder="180" type="text" onChange={e => picSizeY.onChange(e)}/>
                    </div>
                    <p className="text-black-50">p - проценты от блока</p>
                </Col>
                <Col lg={4}>
                    <h4>Добавить кнопки </h4>
                    <h5>Текст кнопки:</h5>
                    <div><input className="w-25 text-center" placeholder="Кнопка" type="text" onChange={e => buttonsText.onChange(e)}/></div>
                    <h5>Цвет кнопки:</h5>
                    <ButtonGroup className="d-block">
                        {
                            colors.map((variant, id) => (
                                <Button key={id}
                                        variant={variant.toLowerCase()}
                                        onClick={() => {
                                    buttonsColor.onClick(variant.toLowerCase())
                                    alertText.onClick("Выбран цвет " + variant.toLowerCase())
                                    setShow(true)
                                        }
                                        }
                                >{variant}</Button>))
                        }
                    </ButtonGroup>
                    <Button className="mr-auto ml-auto mt-2 d-block" variant="success" onClick={() => {
                        setButtons([...buttons, {text: buttonsText.value, color: buttonsColor.value}])
                        alertText.onClick("Кнопка успешно добавлена")
                        setShow(true)
                    }
                    }>Добавить кнопку</Button>
                    <Button className="mr-auto ml-auto mt-2 d-block" variant="danger" onClick={() => {
                        setButtons([])
                        alertText.onClick("Кнопки успешно удалены")
                        setShow(true)
                    }}>Удалить кнопки</Button>
                </Col>
            </Row>
            <h4 className="text-center">Предпросмотр карточки</h4>
            <Card className=" m-auto" style={{width: width.value + "%"}} bg={colorBg.value} text={colorBg.value === 'light' ? 'dark' : 'white'} border={colorBr.value}>
                <Card.Img className="carimg" variant="top" src={"holder.js/" + picSizeZ.value + "x" + picSizeY.value}/>
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
                    console.log(cardArray.length)
                    setCardArray(
                        [...cardArray, {
                            name: name.value,
                            body: body.value,
                            colorBg: colorBg.value,
                            colorBr: colorBr.value,
                            buttons: buttons,
                            column: column.value,
                            picSizeY: picSizeY.value,
                            picSizeZ: picSizeZ.value,
                            id: cardArray.length
                        }]
                    )
                    setShow(true)
                    alertText.onClick("Карточка успешно добавлена")
                }
            }>Добавить</Button>
            <div className="text-center border-top border-dark pt-4">
                <DropdownButton className="d-inline mr-1"  title="Сортировка">
                    <Dropdown.Item onClick={() => { setCardArray([...cardArray].sort(sortByAlphabet))}}>По строке заголовка</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setCardArray([...cardArray].sort(sortByColor))}}>По цвету</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setCardArray([...cardArray].sort(sortById))}}>По индексу</Dropdown.Item>
                </DropdownButton>
                <DropdownButton className="d-inline ml-1" title="Цветовой фильтр">
                    {
                        colors.map((variant, id) => (
                            <Dropdown.Item key={id} className={"text-" + variant.toLowerCase()} onClick={() => {colorSet.onClick(variant.toLowerCase())}} >{variant}</Dropdown.Item>))}
                    <Dropdown.Item onClick={() => {colorSet.onClick("")}} >Убрать фильтр</Dropdown.Item>
                </DropdownButton>
                {colorSet.value !== "" ? <p>Выбран <span className={"text-" + colorSet.value}>цвет</span></p> : <p>Цвет не выбран</p>}
            </div>
            <Row className="m-0 ">
                {mapCards}
            </Row>
            <Alerts show={show} setShow={setShow} text={alertText.value}/>
        </>
    )
}
