import * as React from "react";
import { PostList, PostShow, PostCreate, PostEdit } from "../service/PostService";
import { CategoryList, CategoryShow, CategoryCreate, CategoryEdit } from "../service/CategoryService";
import { LanguageList, LanguageCreate, LanguageEdit, WordCreate, WordList, WordEdit } from "../service/DIctionaryService";
import { CommentList, CommentShow, CommentCreate, CommentEdit } from "../service/CommentsService";
import { Admin, Resource, EditGuesser } from "react-admin";
import {
	FirebaseDataProvider,
	FirebaseAuthProvider
} from "react-admin-firebase";
import { MdModeComment } from 'react-icons/md'
import { MdContentPaste } from 'react-icons/md'
import { FaLanguage } from 'react-icons/fa'
import { firebaseConfig as config } from "../firebase";
// import CustomLoginPage from './CustomLoginPage';



const options = {
	logging: true,

	rootRef: ''
	// rootRef: ''
}
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);


class AdminPanel extends React.Component {
	render() {
		return (
			<Admin
				dataProvider={dataProvider}
				authProvider={authProvider}
			>
				<Resource
					name="posts"
					list={PostList}
					show={PostShow}
					icon={MdModeComment}
					create={PostCreate}
					edit={PostEdit}
				/>

				<Resource
					name="categories"
					list={CategoryList}
					show={CategoryShow}
					icon={MdContentPaste}
					create={CategoryCreate}
					edit={CategoryEdit}
				/>

				{/*  Dictionary Languages */}
				<Resource
					name="languages"
					list={LanguageList}
					show={PostShow}
					icon={FaLanguage}
					create={LanguageCreate}
					edit={EditGuesser}
				/>

				{/* Dictionary words */}
				<Resource
					name="words"
					list={WordList}
					// show={PostShow}
					// icon={FaLanguage}
					create={WordCreate}
					edit={WordEdit}
				// edit={EditGuesser}
				/>

				<Resource
					name="comments"
					list={CommentList}
					show={CommentShow}
					create={CommentCreate}
					edit={CommentEdit}
				/>
			</Admin>
		);
	}
}

export default AdminPanel;
