import React, {useEffect, useState} from 'react';
import {Button, Modal, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import contactsData from "bootstrap/js/src/dom/selector-engine";
import {createContact, deliteContact, putContact} from "../api/ContactApi";
import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2";

const ModalInfo = ({show, onHide, thisContact}) => {

    const [name, setName] = useState(thisContact.name)
    const [adress, setAdress] = useState(thisContact.adress)
    const [phoneNumber, setPhoneNumber] = useState(thisContact.phoneNumber)
    const [email, setEmail] = useState(thisContact.email)

    useEffect(() => {
        if (thisContact) {
            setName(thisContact.name);
            setAdress(thisContact.adress)
            setPhoneNumber(thisContact.phoneNumber)
            setEmail(thisContact.email)
        }
    }, [thisContact]);
    const handlePhoneNumberChange = (e) => {

        const value = e.target.value;
        if (value.length <= 11) {
            setPhoneNumber(value);
        }
    };
    const delContact = () => {

        return swalWithBootstrapButtons.fire({
            title: 'Удалить?',
            text: "Вы действительно хотите удалить контакт?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deliteContact(thisContact.id).then(data => onHide())
                Swal.fire({
                    icon: "success",
                    title: "Удалили",
                    text: "Теперь он для тебя никто",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                onHide()
                Swal.fire({
                    icon: "error",
                    title: "Отмена",
                    text: "Мы рады что вы передумали",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    const updateContact = () => {
        if (name === '' || phoneNumber === '') {
            return Swal.fire({
                icon: "warning",
                title: "Ошибка",
                text: "Имя и номер телефона не могут быть пусты"
            })
        } else {
            putContact(
                thisContact.id,
                {
                    name: name,
                    adress: adress,
                    phoneNumber: phoneNumber,
                    email: email
                }
            ).then(data => onHide())
            return Swal.fire({
                icon: "success",
                title: "Изменить",
                text: "Контакт изменен",
                showConfirmButton: false,
                timer: 1500
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
                    {thisContact.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h7 className="mt-3">ФИО</h7>
                <Form.Control onChange={e => setName(e.target.value)}
                              type="text"
                              placeholder="ФИО"
                              value={name}
                />
                <h7 className="mt-3">Адрес</h7>
                <Form.Control onChange={e => setAdress(e.target.value)}
                              type="text"
                              placeholder="Адрес"
                              value={adress}
                />
                <h7 className="mt-3">Телефон</h7>
                <Form.Control onChange={handlePhoneNumberChange}
                              type="number"
                              placeholder="Телефон"
                              value={phoneNumber}
                              maxLength="12"
                />
                <h7 className="mt-3">Почта</h7>
                <Form.Control onChange={e => setEmail(e.target.value)}
                              type="text"
                              placeholder="Email"
                              value={email}
                />
            </Modal.Body>
            <Modal.Footer>

                <Button variant={"outline-danger"} onClick={delContact}>Удалить</Button>
                <Button variant={"outline-success"} onClick={updateContact}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalInfo;