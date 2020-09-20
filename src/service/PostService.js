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
  ReferenceField,
  ReferenceInput,
  TextField,
  TextInput,
  SaveButton,
  Toolbar,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  DateField,
  required,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='title' alwaysOn />
  </Filter>
);

const getPostAliasFromTitle = (postTitle) => {
  // Cleaniing all forbidden symbols
  postTitle = postTitle.trim().replace(/[^a-zA-Z0-9 ]/g, '');

  // Form and returnn expeected alias
  return postTitle.toLowerCase().replaceAll(/ +/g, '-');
};
const PostCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      label='Create post'
      transform={(data) => ({
        ...data,
        title: data.title.trim(),
        post_alias: getPostAliasFromTitle(data.title),
      })}
      submitOnEnter={true}
      // redirect="posts"
    />
  </Toolbar>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm toolbar={<PostCreateToolbar />}>
      <TextInput source='title' fullWidth validate={required()} />
      <TextInput
        source='excerpt'
        multiline
        fullWidth
        inputProps={{ maxLength: 200 }}
        validate={required()}
      />
      <RichTextInput source='body' validate={required()} />
      <ReferenceInput label='Category' source='category' reference='categories'>
        <SelectInput optionText='title' />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const PostList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick='show'>
      <TextField source='title' />
      <ReferenceField label='Category' source='category' reference='categories'>
        <TextField source='title' />
      </ReferenceField>
      {/* <RichTextField source="category"  optionValue="title"/> */}
      <DateField source='createdate' />
      <DateField source='lastupdate' />
      <EditButton label='Edit' />
      <DeleteButton label='' redirect={false} />
    </Datagrid>
  </List>
);

export const PostShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='post_alias' label='Post Alias' />
      <TextField source='createdate' />
      <TextField source='lastupdate' />
      <TextField source='title' label='Title' />
      <ReferenceField label='Category' source='category' reference='categories'>
        <TextField source='title' />
      </ReferenceField>
      <RichTextField source='body' label='Post content' />
      <TextField source='excerpt' label='Post excerpt' />
    </SimpleShowLayout>
  </Show>
);

export const PostEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source='title' fillWidth validate={required()} />
      <TextInput
        source='post_alias'
        fullWidth
        label="Post alias (no spaces and symbols, except ' - ')"
        validate={required()}
      />
      <RichTextInput
        source='body'
        fullWidth
        label='Post content'
        validate={required()}
      />
      <TextInput source='excerpt' label='Post excerpt' validate={required()} />

      <ReferenceInput label='Category' source='category' reference='categories'>
        <SelectInput optionText='title' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
