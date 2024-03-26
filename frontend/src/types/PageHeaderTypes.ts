export interface PageHeaderProps {
  signInOverlay: boolean;
  signUpOverlay: boolean;
  setSignInOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}
