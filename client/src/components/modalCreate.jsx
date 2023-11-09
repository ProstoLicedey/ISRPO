import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import contactsData from "bootstrap/js/src/dom/selector-engine";
import ContactImg from "../asets/newContact.png";
import {createContact} from "../api/ContactApi";
import Swal from "sweetalert2";
const ModalCreate = ({show, onHide}) => {

    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (value.length <= 11) {
            setPhoneNumber(value);
        }
    };
    const  addContact = () =>{
        try {
            if (name === '' | phoneNumber === '') {
                return Swal.fire({
                    icon: "warning",
                    title: "Ошибка",
                    text: "Имя и номер телефона не могут быть пусты"
                })
            } else {
                createContact({
                    name: name,
                    adress: adress,
                    phoneNumber: phoneNumber,
                    email: email

                }).then(data => onHide())
                return Swal.fire({
                    icon: "success",
                    title: "Добавлено",
                    text: "Контакт добавлен",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
        catch (e){
            return Swal.fire({
                icon: "error",
                title: "Ошибка",
                text: e.response.data.message
            })
        }

    }
    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать контакт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control onChange={e => setName(e.target.value)}
                              type="text"
                              placeholder="ФИО"
                              value={name}
                              className="mt-3"
                />

                <Form.Control onChange={e => setAdress(e.target.value)}
                              type="text"
                              placeholder="Адрес"
                              value={adress}
                              className="mt-3"
                />

                <Form.Control onChange={handlePhoneNumberChange}
                              type="number"
                              placeholder="Телефон"
                              value={phoneNumber}
                              maxLength="12"
                              className="mt-3"
                />

                <Form.Control onChange={e => setEmail(e.target.value)}
                              type="text"
                              placeholder="Email"
                              value={email}
                              className="mt-3"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addContact}>Добавить</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreate;