import React, {useEffect, useLayoutEffect, useState} from 'react';
import {getAllContacts} from "../api/ContactApi";
import {Button, Col, Row} from "react-bootstrap";
import ModalsInfo from "./modalsInfo";
import ModalCreate from "./modalCreate";
import contactsData from "bootstrap/js/src/dom/selector-engine";
import contactImg from "../asets/newContact.png";

const Ecran = () => {
    const [contactsData, setContactsData] = useState([])
    const [infoVisible, setInfoVisible] = useState(false)
    const [createVisible, setCreateVisible] = useState(false)

    useEffect(() => {
        getAllContacts().then((data) => setContactsData(data))
    }, [infoVisible, createVisible]);
    const [Contact, setContact] = useState();
    return (

        <div className="p-2 "
            style={{  height:670}}
        >
            <div className=" mt-1 d-flex justify-content-between algimen">

            <h1>Контакты</h1>

                <Button
                    onClick={ () => {
                        setCreateVisible(true)
                    }}
                    variant="light"
                    style={{background: `url(${contactImg}) no-repeat center center`,
                        width:50,
                        backgroundSize:'contain',
                        height: 50}}/>
            </div>
            {contactsData.map((item, index) =>
                <Row key={item.id}
                     onClick={ () => { setContact(item);
                                 setInfoVisible(true)
                                }}
                     style={{background: index % 2 === 0 ? 'lightgray' : 'transparent',
                         padding: 10,
                         cursor:'pointer'}}
                >
                    {item.name}
                </Row>
            )}
            {Contact && (
                <ModalsInfo thisContact={Contact} show={infoVisible} onHide={() => setInfoVisible(false)} />
            )}
            <ModalCreate show={createVisible} onHide={() => setCreateVisible(false)}/>
        </div>
    );
};

export default Ecran;