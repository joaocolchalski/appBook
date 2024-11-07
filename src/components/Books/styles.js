import styled from "styled-components/native";

export const Container = styled.View`
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 15px;
`

export const Nome = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000;
`

export const Preco = styled.Text`
    font-size: 17px;
    font-style: italic;
`

export const ButtonsView = styled.View`
    flex-direction: row;
    margin-top: 15px;
`

export const Button = styled.TouchableOpacity`
    background-color: #ddd;
    padding: 5px;
    margin-right: 15px;
    border-radius: 5px;
`

export const TextButton = styled.Text`
    color: #000;
    font-size: 16px;
`