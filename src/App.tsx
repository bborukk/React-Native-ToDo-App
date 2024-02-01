/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-ionicons';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeItems, setActiveItems] = useState([]);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [inputTextColor, setInputTextColor] = useState('#5C4040');

  const handleSaveButtonPress = () => {
    if (inputValue.trim() !== '') {
      setTodoList([...todoList, inputValue]);
      setInputValue('');
      setActiveItems([...activeItems, false]);
    }
  };

  const handleDeleteButtonPress = index => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);

    const updatedActiveItems = [...activeItems];
    updatedActiveItems.splice(index, 1);
    setActiveItems(updatedActiveItems);
  };

  const handleItemPress = index => {
    const updatedActiveItems = [...activeItems];
    updatedActiveItems[index] = !updatedActiveItems[index];
    setActiveItems(updatedActiveItems);
  };

  const handleSwitchToggle = () => {
    setSwitchEnabled(!switchEnabled);
    setInputTextColor(switchEnabled ? '#5C4040' : '#FFF2F2');
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: switchEnabled ? '#1D1D1D' : '#382424'},
      ]}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={switchEnabled ? ['#8F00FF', '#EB72FF'] : ['#B2779C', '#FFBEE6']}
        style={[
          styles.titleContainer,
          {backgroundColor: switchEnabled ? '#8F00FF' : '#B2779C'},
        ]}>
        <Text style={styles.title}>ToDo App</Text>
        <Text style={styles.creator}>by Burak Yavuz</Text>
      </LinearGradient>
      <Switch
        value={switchEnabled}
        onValueChange={() => setSwitchEnabled(!switchEnabled)}
        style={styles.switch}
        trackColor={{false: '#B961FF', true: '#FFBEE6'}}
        thumbColor={switchEnabled ? '#B961FF' : '#FFBEE6'}
      />
      <View
        style={[
          styles.listContainer,
          {backgroundColor: switchEnabled ? '#3E3D3D' : '#FFE5F5'},
        ]}>
        <FlatList
          style={[
            styles.list,
            {backgroundColor: switchEnabled ? '#3E3D3D' : '#FFE5F5'},
          ]}
          data={todoList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.todoItem,
                {
                  backgroundColor: activeItems[index]
                    ? switchEnabled
                      ? '#8F00FF'
                      : '#B2779C'
                    : switchEnabled
                    ? '#D785FF'
                    : '#FFBEE6',
                },
                {shadowColor: switchEnabled ? 'white' : 'black'},
              ]}
              onPress={() => handleItemPress(index)}>
              <Text
                style={[
                  styles.todoText,
                  {
                    color: activeItems[index]
                      ? switchEnabled
                        ? 'white'
                        : '#5C4040'
                      : switchEnabled
                      ? 'white'
                      : '#5C4040',
                    textDecorationLine: activeItems[index]
                      ? 'line-through'
                      : 'none',
                  },
                ]}>
                {item}
              </Text>
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  {backgroundColor: switchEnabled ? '#B961FF' : '#FFACDF'},
                ]}
                onPress={() => handleDeleteButtonPress(index)}>
                <Text style={styles.deleteButtonText}>Sil</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <View
          style={[
            styles.bottomContainer,
            {backgroundColor: switchEnabled ? '#B961FF' : '#FFACDF'},
          ]}>
          <TextInput
            style={[
              styles.input,
              {color: inputTextColor, borderColor: inputTextColor},
            ]}
            placeholder="Etkinlik Giriniz"
            placeholderTextColor={switchEnabled ? '#FFFFFF' : '#5C4040'}
            value={inputValue}
            onChangeText={text => setInputValue(text)}
          />
          <View
            style={[
              styles.line,
              {backgroundColor: switchEnabled ? '#5C4040' : '#5C4040'},
            ]}
          />
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: switchEnabled ? '#8F00FF' : '#B2779C'},
            ]}
            onPress={handleSaveButtonPress}>
            <Text style={styles.buttonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#382424',
    flex: 1,
  },
  titleContainer: {
    height: 80,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 40,
    padding: 12,
    color: 'white',
    fontWeight: '200',
  },
  creator: {
    color: 'white',
    paddingTop: 50,
    paddingRight: 12,
    fontWeight: '200',
    fontSize: 13,
  },
  switch: {
    padding: 13,
  },
  listContainer: {
    backgroundColor: '#FFE5F5',
    flex: 1,
    margin: 20,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderLeftWidth: 8,
    borderBottomWidth: 8,
  },
  list: {
    backgroundColor: '#FFE5F5',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    marginBottom: 9,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  todoText: {
    flex: 1,
    fontWeight: '300',
  },
  deleteButton: {
    backgroundColor: '#8F00FF',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  bottomContainer: {
    backgroundColor: '#FFACDF',
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  line: {
    borderWidth: 0.8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    width: 287,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    margin: 5,
    fontWeight: '300',
  },
});

export default App;
