import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import { reduxForm, Field, getFormValues } from "redux-form";

import FieldInput from "components/reduxForm/FieldInput";
import Button from "components/Button";

import ShowWithScope from "containers/blocks/ShowWithScope";

import { reduxFormValidate } from "react-nebo15-validate";

import styles from "./styles.scss";

@withStyles(styles)
@reduxForm({
  form: "medical-program-form",
  validate: reduxFormValidate({
    name: {
      required: true
    }
  })
})
@connect(state => ({
  values: getFormValues("medical-program-form")(state)
}))
export default class MedicalProgramCreateForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onSubmit = () => {},
      submitting,
      disabled
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <div>
            <Field
              name="name"
              labelText="Назва медичної програми"
              component={FieldInput}
              disabled={disabled}
              placeholder="Доступні ліки"
            />
          </div>
          {!disabled && (
            <ShowWithScope scope="medical_program:write">
              <div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Збереження..." : "Створити Медичну програму"}
                </Button>
              </div>
            </ShowWithScope>
          )}
        </div>
      </form>
    );
  }
}
