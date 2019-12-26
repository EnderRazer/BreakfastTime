import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Text, ViewPager, ApplicationProvider, Button, Radio , RadioGroup, Spinner } from 'react-native-ui-kitten';
import { mapping, dark as theme } from '@eva-design/eva';
import {LineChart} from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
export class MainScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = {
      selectedIndex: 1,
      username: "Vova",
      selectedRadioIndex: 0,
      breakfast:false,
      havingBreakfast:false,
      dataCount:7,
      loaded:false,
      loading:false,
      abcis:[],
      dataAppCoef:[],
      dataDetCoef:[],
      minApp:0,
      minDet:0
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
    dataGet(){
      this.setState({loading:true})
      let url ='https://courseappshop.herokuapp.com/api/v1/data'
      fetch(url,{method:'GET'})
    .then(response => response.json())  
    .then((data) => {
      if(data!=null){
        
        //alert("супер "+ JSON.stringify(data))
        this.setState({abcis:data.abscises})
        this.setState({dataAppCoef:data.approximate_cof})
        this.setState({dataDetCoef:data.detalisation_cof})
        //alert(JSON.stringify(this.state.data))
        
        this.setState({loading:false})
        this.setState({loaded:true})
      }
      return data
    }).catch(error => {  
        alert("Ошибка: "+error)  
    })
    }
    async shoppingPost() {
      let url ='https://courseappshop.herokuapp.com/api/v1/data'
      let response = await fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({  name:"vova",
                                time:{
                                  "day":new Date().getDate(),
                                  "month":new Date().getMonth()
                                },
                                amount:1
                              })
                            })
                              .then(response => {
                                if (response.status >= 200 && response.status < 300) {  
                                    //alert("Заебумба")
                                    return Promise.resolve(response)  
                                } else {  
                                    alert("Не заебумба")
                                    return Promise.reject(response)  
                                }  
                            })  
                            .then(response => {
                                return response.text()
                            })  
                            .then(function(data) {
                              //this.setState({breakfast:true})  
                              alert("Вы успешно сходили в магазин!")
                              
                            }).catch(error => {  
                                alert(error)  
                            })
    }
    goShopping = () =>{
      this.shoppingPost()
    }
    renderLoading = () => (
      <Layout style={styles.loading}>
        <Spinner size='giant' status='danger'/>
      </Layout>
    )
    renderChart = () => (
      <Layout style={styles.loading}>
      {
      this.state.loaded ? (
        <Layout style={styles.loading}>
          <ScrollView>
          <Layout style={styles.chart}>
          <LineChart
    data={{
      labels: ["December"],
      datasets: [
        {
          data: this.state.dataAppCoef
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: "#2b0345",
      backgroundGradientFrom: "#2b0345",
      backgroundGradientTo: "#2b034a",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "0",
        strokeWidth: "0",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
          </Layout>
          <Layout style={styles.chart}>
          <LineChart
    data={{
      labels: ["December"],
      datasets: [
        {
          data: this.state.dataDetCoef
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: "#2b0345",
      backgroundGradientFrom: "#2b0345",
      backgroundGradientTo: "#2b034a",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "0",
        strokeWidth: "0",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
          </Layout>
            
          </ScrollView>
        </Layout>) : null
      }
      </Layout>
    )
    displayData = () => {
      let result = this.dataGet()
      
    }
    render(){
      return (
        <ApplicationProvider mapping={mapping} theme={theme}>  
            <ViewPager
              selectedIndex={this.state.selectedIndex}
              onSelect={this.onIndexChange}
              style={styles.container}>
              <Layout style={styles.contentContainer}>

              </Layout>
              <Layout style={styles.contentContainer}>
                <Button onPress={this.goShopping}
                  >
                  Сходить в магазин
                </Button>
              </Layout>
              <Layout style={styles.contentContainer}
                >
                <Text style={styles.text}>Вывести графики</Text>
                <Button onPress={this.displayData}>
                  Показать графики
                </Button>
                <Layout style={styles.container}>
                {
                  this.state.loading ? this.renderLoading() : this.renderChart()
                }
                </Layout>
              </Layout>
            </ViewPager>
        </ApplicationProvider>
      );
    }
    
  }
    const styles = StyleSheet.create({
      chart:{
        marginTop:10
      },
    loading: {
      marginTop:10,
      justifyContent: 'center',
      alignItems: 'center',
      width:300
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