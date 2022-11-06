import React from 'react';
import { Card } from 'react-bootstrap';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

export default function Post({ data }) {
    const images = data.imageURL.map((URL) => {
        return {
            original: URL,
            thumbnail: URL,
            fullscreen: URL
        }
    });

    return <>
        <Card className="mx-auto mt-4 mb-4" style={{maxWidth: "60%"}}>
            <ImageGallery items={images} />
            <Card.Body>
                <Card.Title>{data.eventName}</Card.Title>
                <Card.Text>{data.desc}</Card.Text>
                {data.link !== null?<span><strong>Registration Link:</strong>data.link</span> : ""}
            </Card.Body>
            <Card.Footer className="text-muted">{data.date}</Card.Footer>
        </Card>
    </>;
}
