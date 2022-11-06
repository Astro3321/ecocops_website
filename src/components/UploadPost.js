import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { db, storage } from '../firebase-config';
import { addDoc, collection } from '@firebase/firestore';

export default function UploadPost() {
    const nameRef = useRef();
    const descRef = useRef();
    const dateRef = useRef();
    const [link, setLink] = useState(null);
    const [imageRef, setImageRef] = useState();
    
    const [formType, setFormType] = useState(0); 
    const [loading, setLoading] = useState(false);   
    const [error, setError] = useState('');

    const imageURLs = [];

    function imageUpload(storageRef, imageName){
        return new Promise((resolve, reject) => {
            uploadBytes(storageRef, imageName).then(() => {
                getDownloadURL(storageRef).then((URL) => {
                    resolve(URL);
                });
            }); 
        });
    };

    async function handleSubmit(event){
        const timestamp = new Date(dateRef.current.value).getTime();
        event.preventDefault();
        setLoading(true);
        setError('');

        if (imageRef){
            const storageType = formType === 0?"upcoming_event":"past_events";
            
            for (let i = 0;i < imageRef.length;i++){
                let imageName = imageRef[i];
                const storageRef = ref(storage, `${storageType}/${nameRef.current.value}+${timestamp}/${i}`);
                const res = await imageUpload(storageRef, imageName);
                imageURLs.push(res);
            }
        }

        const data = {
            eventName: nameRef.current.value,
            imageURL: imageURLs,
            desc: descRef.current.value,
            link: link,
            date: dateRef.current.value,
            timestamp: timestamp
        };

        console.log(link);

        const collectionType = formType === 0?"upcoming_event":"past_events";
        const collectionRef = collection(db, collectionType);
        addDoc(collectionRef, data).then(() => {
        }).catch(e => {
            setError(e.message);
        })

        setLoading(false);
    }

    const regLink = <>
        <Form.Group id="link">
            <Form.Label>Registration Link</Form.Label>
            <Form.Control type="text" onChange={e => setLink(e.target.value)} required></Form.Control>
        </Form.Group>
    </>;

    return (
        <><Card className="mx-auto">
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="formType" className="mb-2">
                        <Form.Label>Upload For</Form.Label>
                        <Form.Check type="radio" label="Upcoming Event" name="formType"
                            onChange={() => {setFormType(0)}} checked={formType === 0} required/>
                        <Form.Check type="radio" label="Past Event" name="formType"
                            onChange={() => {setFormType(1)}} required/>
                    </Form.Group>

                    <Form.Group id="name">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                    </Form.Group>

                    <Form.Group id="images">
                        <Form.Label>{formType === 0?"Poster":"Images"}</Form.Label>
                        <Form.Control type="file" onChange={event => {setImageRef(event.target.files)}} 
                            multiple required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group id="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" ref={descRef} required></Form.Control>
                    </Form.Group>

                    {formType === 0?regLink:""}

                    <Form.Group id="date">
                        <Form.Label>{formType === 0?"Apply Before":"Date of Event"}</Form.Label>
                        <Form.Control type="date" ref={dateRef} required></Form.Control>
                    </Form.Group> 

                    <Button className="w-40 mt-4 mx-auto d-flex" disabled={loading} type="submit">Upload</Button>
                </Form>
            </Card.Body>
        </Card></>
    );
}
