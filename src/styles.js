import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #373737;
    padding-top: 45px;
`

export const Logo = styled.Text`
    font-size: 35px;
    text-align: center;
    color: #fff;
    font-weight: bold;
`

export const Title = styled.Text`
    font-size: 22px;
    margin-left: 15px;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 5px;
`

export const Input = styled.TextInput`
    height: 40px;
    margin-left: 15px;
    margin-right: 15px;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
`

export const ErrText = styled.Text`
    margin-left: 15px;
    color: #ff0000;
    font-weight: bold;
    margin-top: 5px;
`

export const ButtonsView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

export const Button = styled.TouchableOpacity`
    background-color: #fff;
    height: 40px;
    border-radius: 5px;
    padding: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

export const TextButton = styled.Text`
    font-size: 17px;
`

export const List = styled.FlatList.attrs({
    contentContainerStyle: { paddingHorizontal: 20 }
})`
    margin-top: 10px
`