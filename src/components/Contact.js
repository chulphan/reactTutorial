import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [
        {name: 'Byungchul', phone: '010-9999-9999'},
        {name: 'JaeYeon', phone: '010-8888-8888'},
        {name: 'HyungUn', phone: '010-7777-7777'},
        {name: 'MinWoo', phone: '010-6666-6666'},
        {name: 'JuHyung', phone: '010-5555-5555'}
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

  }

  componentWillMount() {
    const contactData = localStorage.contactData;

    if (contactData) {
      this.setState({
        contactData: JSON.parse(contactData)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.contactData) != JSON.stringify(this.state.contactData)){
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key, 'is selected');
  }

  handleCreate (contact) {
    this.setState({
      contactData: update(this.state.contactData, { $push: [contact]})
    });
  }

  handleRemove() {
    if(this.state.selectedKey < 0){
      return;
    }

    this.setState({
      contactData: update(this.state.contactData, { $splice: [[this.state.selectedKey, 1]]}
      ),
      selectedKey: -1
    });
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData,
        {
            [this.state.selectedKey]: {
                name: { $set: name },
                phone: { $set: phone }
            }
        }
      )
    });
  }

  render() {
    const mapToComponent = (data) => {
      data.sort();
      data = data.filter((contact) => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
      })
      return data.map((contact, i) => {
        return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={() => this.handleClick(i)}
                />);
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponent(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          selectedKey={ this.state.selectedKey }
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={ this.handleRemove }
          onEdit={ this.handleEdit }
        />
        <ContactCreate
            onCreate={this.handleCreate}
        />
      </div>
    )
  }
}
