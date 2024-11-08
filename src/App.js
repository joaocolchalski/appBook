import React, { useState, useEffect } from "react";
import getRealm from "./services/realm";

import {
    Container,
    Logo,
    Title,
    Input,
    ErrText,
    ButtonsView,
    Button,
    TextButton,
    List
} from "./styles";
import Books from "./components/Books";
import { Keyboard } from "react-native";

export default function App() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [books, setBooks] = useState([])
    const [errInputName, setErrInputName] = useState(false)
    const [errInputPrice, setErrInputPrice] = useState(false)
    const [renderButtonEdit, setRenderButtonEdit] = useState(false)
    const [idEdit, setIdEdit] = useState(null)

    useEffect(() => {
        async function loadBooks() {
            const realm = await getRealm()

            const data = realm.objects('Book')

            setBooks(data)
        }

        loadBooks()
    }, [])

    async function saveBook(data) {
        const realm = await getRealm()

        const id = realm.objects('Book').sorted('id', true).length > 0
            ? realm.objects('Book').sorted('id', true)[0].id + 1 : 1 //O TRUE dentro do sorted significa que o resultado vai ser ordenado de forma decrescente, se fosse FALSE, seria de forma crescente

        const dadosLivro = {
            id: id,
            name: data.name,
            price: data.price
        }

        realm.write(() => {
            realm.create('Book', dadosLivro)
        })
    }

    async function addBook() {
        if (name.trim().length === 0 && price.trim().length === 0) {
            setErrInputName(true)
            setErrInputPrice(true)
        } else if (name.trim().length === 0) {
            setErrInputName(true)
        } else if (price.trim().length === 0) {
            setErrInputPrice(true)
        } else {
            try {
                const data = { name, price }
                await saveBook(data)

                setName('')
                setPrice('')
                setErrInputName(false)
                setErrInputPrice(false)
                Keyboard.dismiss()
            } catch (err) {
                console.log(err)
            }
        }
    }

    function editBook(data) {
        setName(data.name)
        setPrice(data.price)
        setIdEdit(data.id)
        setErrInputName(false)
        setErrInputPrice(false)
        setRenderButtonEdit(true)
    }

    async function saveEditBook() {
        if (!errInputName && !errInputPrice) {
            const realm = await getRealm()

            const newData = {
                id: idEdit,
                name,
                price
            }

            realm.write(() => {
                realm.create('Book', newData, 'modified')
            })

            const dadosAlterados = realm.objects('Book').sorted('id', false)//O FALSE dentro do sorted significa que o resultado vai ser ordenado de forma crescente, se fosse TRUE, seria de forma decrescente
            setBooks(dadosAlterados)
            setName('')
            setPrice('')
            setIdEdit(null)
            setRenderButtonEdit(false)
            Keyboard.dismiss()
        }
    }

    function cancelEditBook() {
        setName('')
        setPrice('')
        setIdEdit(null)
        setRenderButtonEdit(false)
        setErrInputName(false)
        setErrInputPrice(false)
    }

    async function deleteBook(data) {
        const realm = await getRealm()

        const id = data.id

        realm.write(() => {
            if (realm.objects('Book').filtered('id =' + id).length > 0) {
                realm.delete(
                    realm.objects('Book').filtered('id =' + id)
                )
            }
        })

        const dadosAlterados = realm.objects('Book').sorted('id', false)//O FALSE dentro do sorted significa que o resultado vai ser ordenado de forma crescente, se fosse TRUE, seria de forma decrescente

        setBooks(dadosAlterados)
    }

    function validateInput(text, inputRef) {
        if (inputRef === 'name') {
            setName(text)
            text.trim().length === 0 ? setErrInputName(true) : setErrInputName(false)
        } else if (inputRef === 'price') {
            setPrice(text)
            text.trim().length === 0 ? setErrInputPrice(true) : setErrInputPrice(false)
        }

    }

    return (
        <Container>
            <Logo>Próximos Livros</Logo>

            <Title>Nome</Title>
            <Input
                value={name}
                onChangeText={(text) => validateInput(text, 'name')}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {errInputName && (<ErrText>Nome inválido!</ErrText>)}

            <Title>Preço</Title>
            <Input
                value={price}
                onChangeText={(text) => validateInput(text, 'price')}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {errInputPrice && <ErrText>Preço inválido!</ErrText>}

            {!renderButtonEdit ? (
                <ButtonsView>
                    <Button onPress={addBook}>
                        <TextButton>Cadastrar</TextButton>
                    </Button>
                </ButtonsView>
            ) : (
                <ButtonsView>
                    <Button onPress={cancelEditBook}>
                        <TextButton>Cancelar</TextButton>
                    </Button>
                    <Button onPress={saveEditBook}>
                        <TextButton>Salvar</TextButton>
                    </Button>
                </ButtonsView>
            )}

            <List
                data={books}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Books data={item} editBook={editBook} deleteBook={deleteBook} />}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled' //Fecha o input quando clica na lista
            />
        </Container>
    )
}