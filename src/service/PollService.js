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
  SimpleForm,
  DateInput,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  DateField,
  SaveButton,
  Toolbar,
  ArrayInput,
  ArrayField,
  SimpleFormIterator,
  BooleanInput,
  required,
} from 'react-admin';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  addButton: {
    marginTop: 2,
    display: 'none',
  },
});
const getPollAliasFromTitle = (title) => {
  // Cleaniing all forbidden symbols
  title = title.trim().replace(/[^a-zA-Z0-9 ]/g, '');

  // Form and returnn expeected alias
  return title.toLowerCase().replaceAll(/ +/g, '-');
};
const PollCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      label='Create Poll'
      transform={(data) => ({
        ...data,
        title: data.title.trim(),
        alias: getPollAliasFromTitle(data.title),
      })}
      submitOnEnter={true}
      // redirect="posts"
    />
  </Toolbar>
);

const PollFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='title' alwaysOn />
  </Filter>
);

const CustomButton = (title) => {
  const classes = useStyles();
  return (
    <Button
      variant='contained'
      style={{}}
      color='primary'
      style={{ marginTop: 20 }}
    >
      {title}
    </Button>
  );
};

export const PollCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm toolbar={<PollCreateToolbar />}>
        <TextInput source='title' fullWidth validate={required()} />
        <TextInput source='description' multiline fullWidth />

        {/* QUESTIONS ///////////*/}
        <ArrayInput
          source='questions'
          label='Quesetions'
          style={{ position: 'relative' }}
          fullWidth
        >
          <SimpleFormIterator addButton={CustomButton('Add question')}>
            <TextInput
              source='question'
              label='Question '
              fullWidth
              multiline
              validate={required()}
            />
            <TextInput
              source='code'
              label='Question code'
              fullWidth
              multiline
            />

            {/* ANSWER VARIANTS  //////////*/}
            <ArrayInput source='answerVariants' label='answers'>
              <SimpleFormIterator
                addButton={CustomButton('Add answer variant')}
              >
                <TextInput
                  source='answer'
                  label='Answer variant'
                  multiline
                  fullWidth
                  validate={required()}
                />
                <BooleanInput source='isCorrect' label='correct?' />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export const PollList = (props) => (
  <List {...props} filters={<PollFilter />}>
    <Datagrid rowClick={'edit'}>
      <TextField source='title' label='Title' />
      <DateField source='lastupdate' label='Last update' />
      <EditButton label='' />
      <DeleteButton label='' redirect={false} />
    </Datagrid>
  </List>
);

export const PollShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <DateField source='createdate' label='Creation date' fullWidth />
      <TextField source='createdby' label='Author' fullWidth />
      <TextField source='title' label='Title' />
      <TextField source='description' label='Description' multiLine />

      {/* QUESTIONS ///////////*/}
      <ArrayField source='questions'>
        <SimpleFormIterator>
          <TextField source='question' multiline />
          <TextField source='code' multiline />

          {/* ANSWER VARIANTS  //////////*/}
          <ArrayField source='questions'>
            <SimpleFormIterator>
              <TextField
                source='answer_variant'
                multiline
                validate={required()}
              />
              <BooleanInput source='isCorrect' />
            </SimpleFormIterator>
          </ArrayField>
        </SimpleFormIterator>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export const PollEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DateInput source='createdate' label='Creation date' disabled fullWidth />
      <TextInput source='createdby' label='Author' disabled fullWidth />
      <TextInput source='title' fullWidth />
      <TextInput source='description' multiline fullWidth />

      {/* QUESTIONS ///////////*/}
      <ArrayInput
        source='questions'
        label='Quesetions'
        style={{ position: 'relative' }}
        fullWidth
      >
        <SimpleFormIterator addButton={CustomButton('Add question')}>
          <TextInput
            source='question'
            label='Question '
            fullWidth
            multiline
            validate={required()}
          />
          <TextInput source='code' label='Question code' fullWidth multiline />

          {/* ANSWER VARIANTS  //////////*/}
          <ArrayInput source='answerVariants' label='answers'>
            <SimpleFormIterator addButton={CustomButton('Add answer variant')}>
              <TextInput
                source='answer'
                label='Answer variant'
                multiline
                fullWidth
                validate={required()}
              />
              <BooleanInput source='isCorrect' label='correct?' />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
