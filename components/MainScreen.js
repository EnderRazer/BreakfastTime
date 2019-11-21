import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, ViewPager, ApplicationProvider, Button, Radio , RadioGroup, Spinner } from 'react-native-ui-kitten';
import { mapping, dark as theme } from '@eva-design/eva';
export class MainScreen extends React.Component {
  constructor(props){
    super(props)
  }
    static navigationOptions = {
        header: null
    };
    state = {
       selectedIndex: 1,
       username: this.props.navigation.state.params.username,
       selectedRadioIndex: 0,
       breakfast:false,
       dataCount:7,
       loading:false,
       loadingStart:false,
     };
  
    onIndexChange = (selectedIndex) => {
      this.setState({ selectedIndex: selectedIndex });
    };
    onButtonPress = () => {
        this.props.navigation.navigate('Login')
    }
    onGroupSelectionChange = (selectedRadioIndex) => {
      this.setState({ selectedRadioIndex: selectedRadioIndex });
      switch(this.selectedRadioIndex){
        case 0:
          this.setState({dataCount: 7})
          break
        case 1:
          this.setState({dataCount: 30})
          break
      }
    };
    haveBreakfast = () => {
      this.setState({breakfast:true})
    }
    renderLoading = () => (
      <Layout style={styles.loading} size='giant' status='danger'>
        <Spinner/>
      </Layout>
    );
    displayData = () => {
      this.setState({loadingStart:true})
      alert(this.state.loadingStart) 
    }
    timeout = () => {
      this.setState({loading:false})
    }
    render(){
      return (
        <ApplicationProvider mapping={mapping} theme={theme}>  
            <ViewPager
              selectedIndex={this.state.selectedIndex}
              onSelect={this.onIndexChange}
              style={styles.container}>
              <Layout style={styles.contentContainer}>
                <Text style={styles.text}>Здарова, {this.state.username}</Text>
                <Button 
                    onPress={this.onButtonPress}>
                    Sign Out
                </Button>
              </Layout>
              <Layout style={styles.contentContainer}>
                {
                  this.state.breakfast ? (
                    <Text>Вы уже завтракали сегодня</Text>
                  ) : (
                    <Text>Вы еще не завтракали сегодня</Text>
                  )
                }
                <Button onPress={this.haveBreakfast}
                  disabled={this.state.breakfast}>
                  Позавтракать
                </Button>
              </Layout>
              <Layout style={styles.contentContainer}
                >
                <Text style={styles.text}>Вывести график</Text>
                <RadioGroup
                  selectedIndex={this.state.selectedRadioIndex}
                  onChange={this.onGroupSelectionChange}
                  style={styles.radioGroup}>
                  <Radio text='За неделю' style={styles.radio}/>
                  <Radio text='За месяц'/>
                </RadioGroup>
                <Button onPress={this.displayData}>
                  Показать график
                </Button>
                <Layout style={styles.container}>
                {
                  this.state.loadingStart ? this.renderLoading() : null 
                }
                </Layout>
              </Layout>
            </ViewPager>
        </ApplicationProvider>
      );
    }
    
  }
    const styles = StyleSheet.create({
    radioGroup:{
      marginBottom:15
    },
    radio:{
      marginBottom:10
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex:1,
      justifyContent: 'space-around'
    },
    text: {
      textAlign: 'center',
      fontFamily: '17719',
      fontSize: 20,
      marginBottom:15,
      marginTop:15
    },
    })