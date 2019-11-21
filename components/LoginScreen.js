import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { ApplicationProvider, Layout, Text, Input, Button } from 'react-native-ui-kitten';
import { mapping, dark as theme } from '@eva-design/eva';


export class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            login:'',
            password: '',
            fontLoaded: false,
        };
        this.Login=this.Login.bind(this);
        this.Register=this.Register.bind(this);
    }
    onChangeLogin = (text) => {
        this.setState({ login: text })
    };
    onChangePassword = (text) => {
        this.setState({ password: text })
    };
    Login= () => {
        alert(this.state.login + ' '+this.state.password)
        this.props.navigation.navigate('Main', { username: this.state.login })
    }
    Register = () => {
        this.props.navigation.navigate('Register')
    }
    render() { 
        return (
            <ApplicationProvider mapping={mapping} theme={theme}>
                <Layout>
                    <TouchableHighlight onPress={this.Register}>
                        <Text style={styles.registerText}
                                category='c2'>Register</Text>
                    </TouchableHighlight>
                </Layout>
                <Layout style={styles.container}>
                    <Text style={styles.text} category="h3">
                      Твой незыбываемый завтрак
                    </Text>
                    <Input 
                        style={styles.inputText}
                        placeholder="Login"
                        onChangeText={this.onChangeLogin}
                        value={this.state.login}
                    />
                    <Input
                        secureTextEntry={true}
                        style={styles.inputText} 
                        placeholder="Password"
                        onChangeText={this.onChangePassword}
                        value={this.state.password}
                    />
                    <Button 
                        style={styles.button}
                        onPress={this.Login}>
                        Login in
                    </Button>
                </Layout>
            </ApplicationProvider>
        )
    }

    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      fontFamily: '17719',
      marginBottom: 50
    },
    inputText:{
        width: 200
    },
    button:{
        marginTop: 15
        
    },
    registerText:{
        textAlign: 'right',
        fontFamily: '17719'
    }
  });