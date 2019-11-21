import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { ApplicationProvider, Layout, Text, Input, Button, Tooltip, Popover } from 'react-native-ui-kitten';
import { mapping, dark as theme } from '@eva-design/eva';

export class RegistrationScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password: '',
            status:'primary',
            nameTooltipVisible:false,
            emailTooltipVisible:false,
            passwordTooltipVisible:false,
            nameTooltipText:'',
            emailTooltipText:'',
            passwordTooltipText:'',
            placement:'top'
        }
        this.onButtonPress=this.onButtonPress.bind(this);
    }
    onChangeName = (text) => {
        this.setState({ name: text })
        this.checkName()
    };
    onChangeEmail = (text) => {
        this.setState({ email: text })
        this.checkEmail()
    };
    onChangePassword = (text) => {
        this.setState({ password: text })
        this.checkPassword()
    }; 
    async register() {
        let url = 'https://courseappfirst.herokuapp.com/api/user/register'
        let response = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({  name:this.state.name,
                                    email: this.state.email,
                                    password: this.state.password})
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {  
                let status = 'success'
                this.setState({status:status})
                return Promise.resolve(response)  
            } else {  
                return Promise.reject(response)  
            }  
        })  
        .then(response => {
            return response.text()
        })  
        .then(function(data) {  
          alert(data);  
        }).catch(error => {  
            return error.text()
          //alert(text);  
        }).then(error => {
            if(error.includes("exist")){
                this.setState({emailTooltipText:"Почта уже зарегистрирована"})
                this.setState({emailTooltipVisible:true})
                this.refs.Email.focus()
            }
        });
    }
    checkName() {
        let name = this.state.name
        if(name.length<6){
            this.setState({nameTooltipText: "Имя профиля должно содержать не менее 6 символов"})
            this.setState({nameTooltipVisible: true})
            return false
        }else {
            this.setState({nameTooltipVisible:false})
            return true
        }
    }
    checkPassword() {
        let password = this.state.password
        if(password.length<6){
            this.setState({passwordTooltipText: "Пароль должен содержать не менее 6 символов"})
            this.setState({passwordTooltipVisible: true})
            return false
        }else {
            this.setState({passwordTooltipVisible:false})
            return true
        }
    }
    checkEmail() {
        let email = this.state.email
        let length = false
        let valid = false
        if(email.length<6){
            this.setState({emailTooltipText: "Емейл должен содержать не менее 6 символов"})
            this.setState({emailTooltipVisible: true})
        }else {
            this.setState({emailTooltipVisible:false})
            length = true
        }
        if(!email.includes('@')){
            this.setState({emailTooltipText: "Введите действительный адрес почты"})
            this.setState({emailTooltipVisible: true})
        }else {
            this.setState({emailTooltipVisible:false})
            valid = true
        }
        if(valid&&length){
            return true
        }else{
            return false
        }
    }
    checkToolbar() {
        return !(this.nameTooltipVisible||this.emailTooltipVisible||this.passwodTooltipVisible)
    }
    onButtonPress() {
        alert(this.state.email + ' ' +this.state.password + ' '+ this.state.name)
        if(this.checkToolbar()){
            this.setState({status:"success"})
            this.register()  
            //this.props.navigation.navigate('Login')    
        }else{
            this.setState({status:"danger"})
        }
    }
    render() { 
        return (
            <ApplicationProvider mapping={mapping} theme={theme}>
            <Layout style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                
                    <Text style={styles.text} category='h1'>
                      Регистрация
                    </Text>
                    <Tooltip
                        visible={this.state.nameTooltipVisible}
                        placement={this.state.placement}
                        text={this.state.nameTooltipText}
                    >
                    <Text style={styles.hiddenLabel}></Text>
                    </Tooltip>
                    <Input 
                        style={styles.inputText}
                        placeholder="Name"
                        onChangeText={this.onChangeName}
                        value={this.state.name}
                    />
                    <Tooltip
                        visible={this.state.emailTooltipVisible}
                        placement={this.state.placement}
                        text={this.state.emailTooltipText}
                        >
                    <Text style={styles.hiddenLabel}></Text>
                    </Tooltip>
                    <Input 
                        ref="Email"
                        style={styles.inputText}
                        placeholder="Email"
                        onChangeText={this.onChangeEmail}
                        value={this.state.email}
                    />
                    
                    <Tooltip
                        visible={this.state.passwodTooltipVisible}
                        placement={this.state.placement}
                        text={this.state.passwordTooltipText}
                    >
                    <Text style={styles.hiddenLabel}></Text>
                    </Tooltip>
                    <Input
                        style={styles.inputText} 
                        placeholder="Password"
                        onChangeText={this.onChangePassword}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    
                    <Button 
                        style={styles.button}
                        onPress={this.onButtonPress}
                        status={this.state.status}>
                        Register
                    </Button>
                </KeyboardAvoidingView>
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
      marginBottom: 20
    },
    inputText:{
        width: 200,
        marginBottom: 10
    },
    button:{
        marginTop: 15
    },
    hiddenLabel:{
        margin:-10
    }
  });