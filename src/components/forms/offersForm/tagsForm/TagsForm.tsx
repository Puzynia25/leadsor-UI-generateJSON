import { Formik } from "formik";

const TagsForm = ({ initialTags, onTagsChange }) => {
    return (
        <>
            <Formik initialValues={initialTags}></Formik>
        </>
    );
};

export default TagsForm;
