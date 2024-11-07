import React from 'react';
import {
    Container,
    Nome,
    Preco,
    ButtonsView,
    Button,
    TextButton,
} from './styles';

export default function Books({ data, editBook }) {
    return (
        <Container>
            <Nome>{data.name}</Nome>

            <Preco>R$ {Number(data.price).toFixed(2)}</Preco>

            <ButtonsView>
                <Button onPress={() => editBook(data)}>
                    <TextButton>Editar</TextButton>
                </Button>

                <Button>
                    <TextButton>Excluir</TextButton>
                </Button>
            </ButtonsView>
        </Container>
    );
}