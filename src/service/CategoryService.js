import * as React from "react";
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
  required,
} from "react-admin";

const CategoryFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const CategoryList = (props) => (
  <List {...props} filters={<CategoryFilter />}>
    <Datagrid rowClick={'edit'}> 
      <TextField source="title" />
      <DateField source="createdate" />
      <DateField source="lastupdate" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false}/>
    </Datagrid>
  </List>
);

export const CategoryShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" label="category"/>
      <DateField source="createdate" />
      <DateField source="lastupdate" />
    </SimpleShowLayout>
  </Show>
);

export const CategoryCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="title" required/>
    </SimpleForm>
  </Create>
);

export const CategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" options={{ disabled: true }} />
      <DateInput source="createdate" options={{ disabled: true }} />
      <DateInput source="lastupdate" label="Last updated" options={{ disabled: true }} />
      
      <TextInput source="title" label="Change category name"/>

    </SimpleForm>
  </Edit>
);
