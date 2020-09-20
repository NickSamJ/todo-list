import * as React from 'react';
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  DateInput,
  SimpleForm,
  ReferenceField,
  ReferenceInput,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  required,
  FileField,
  FileInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  inputWrapper: {
    background: green,
  },
  formWrapper: {
    display: 'flex',
  },
  formColumn: {
    width: '50%',
    padding: 20,
  },
});

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='title' alwaysOn />
  </Filter>
);

// Languages
export const LanguageCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='title' label='Enter title' />
      <TextInput source='code' label='ISO language code' />
    </SimpleForm>
  </Create>
);

export const LanguageList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick={'edit'}>
      <TextField source='title' label='Language name' />
      <TextField source='code' label='language code' />
      <ShowButton label='' />
      <DeleteButton label='' redirect={false} />
    </Datagrid>
  </List>
);

export const LanguageEdit = (props) => {
  const classes = useStyles();
  return (
    <Edit {...props}>
      <SimpleForm>
        <div className={classes.formWrapper} fullWidth>
          <div className={classes.formColumn}>
            <TextInput
              source='title'
              label='Language name'
              formClassName={classes.inputWrapper}
              required
              fullWidth
            />
            <TextInput
              source='code'
              label='ISO language code'
              formClassName={classes.inputWrapper}
              required
              fullWidth
            />
          </div>
          <div className={classes.formColumn}>
            <TextInput source='id' disabled fullWidth />
            <DateInput source='createdate' disabled fullWidth />
            <DateInput source='lastupdate' disabled fullWidth />
            <TextInput source='createdby' disabled fullWidth />
            <TextInput source='updatedby' disabled fullWidth />
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};

// Words
export const WordCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='word' label='Enter word' validate={required()} />
      <TextInput
        source='translate'
        label='Enter translate'
        validate={required()}
      />
      <ReferenceInput
        label='Language'
        source='language'
        defaultValue='zr9Cby6jE5RTx418yzy5'
        reference='languages'
      >
        <SelectInput optionText='title' />
      </ReferenceInput>
      <RichTextInput source='comment' label='Comment' />
      <RichTextInput source='usefulLinks' label='Please, only useful liks' />
    </SimpleForm>
  </Create>
);

export const WordList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick='edit'>
      <TextField source='word' />
      <TextField source='translate' />
      <TextField source='language' />
      <RichTextField source='comment' />
      <RichTextField source='usefulLinks' />
      <EditButton label='' />
      <DeleteButton label='' redirect={false} />
    </Datagrid>
  </List>
);

// export const WordEdit = (props) => {

//   return (
//   <Edit {...props} onFailure={() => {
//     alert("NOT EDITED")
//   }}>
//     <SimpleForm>
//     <TextInput source="word" label="Enter word" />
//       <TextInput source="translate" label="Enter translate" />
//       <ReferenceInput label="Language" source="language" reference="languages">
//         <SelectInput optionText="title" />
//       </ReferenceInput>
//       <RichTextInput source="comment" label="Comment" />
//       <RichTextInput source="usefulLinks" label="Please, only useful liks" />
//     </SimpleForm>
//   </Edit>
// )};

export const WordEdit = (props) => {
  const classes = useStyles();
  return (
    <Edit {...props}>
      <SimpleForm>
        <div className={classes.formWrapper} fullWidth>
          <div className={classes.formColumn}>
            <TextInput source='word' validate={required()} fullWidth />
            <TextInput source='translate' validate={required()} fullWidth />
            <TextInput source='language' fullWidth />
          </div>
          <div className={classes.formColumn}>
            <TextInput source='id' options={{ disabled: true }} />
            <DateInput
              source='lastupdate'
              options={{ disabled: true }}
              fullWidth
            />
            <TextInput
              source='updatedby'
              options={{ disabled: true }}
              fullWidth
            />
            <DateInput
              source='createdate'
              options={{ disabled: true }}
              fullWidth
            />
            <TextInput
              source='createdby'
              options={{ disabled: true }}
              fullWidth
            />
          </div>
        </div>

        <RichTextInput source='comment' fullWidth />
        <RichTextInput source='usefulLinks' fullWidth />
      </SimpleForm>
    </Edit>
  );
};
