import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import { addContact } from 'redux/operations';
import s from './ContactForm.module.css';

const ContactForm = () => {
    const [contact, setContact] = useState({ name: '', number: '' });
    const contacts = useSelector(state => state.contacts.items);
    const dispatch = useDispatch();

    const submitData = event => {
        event.preventDefault();
        if (contacts.find(({ name }) => name === contact.name)) {
            alert(`${contact.name} is already in contacts`);
        } else {
            dispatch(addContact(contact));
        }
        setContact({ name: '', number: '' });
    };

    const saveData = event => {
        const { name, value } = event.target;
        setContact(state => ({ ...state, [name]: value }));
    };

    return (
        <form className={s.form} onSubmit={submitData}>
            <label className={s.label}>
                <span className={s.label__text}>Name</span>
                <input
                    className={s.input}
                    type="text"
                    value={contact.name}
                    onChange={saveData}
                    name="name"
                    required
                />
                <FaUser className={s.icon} size="15" />
            </label>
            <label className={s.label}>
                <span className={s.label__text}>Number</span>
                <input
                    className={s.input}
                    type="tel"
                    value={contact.number}
                    onChange={saveData}
                    name="number"
                    required
                />
                <FaPhoneAlt className={s.icon} size="15" />
            </label>
            <button className={s.button} type="submit">
                Add contact
            </button>
        </form>
    );
};

export default ContactForm;
