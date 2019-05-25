import React from "react";
import MediaQuery from "react-responsive";

export const Desktop = props => <MediaQuery {...props} minWidth={576} />;
export const MediumRes = props => <MediaQuery {...props} maxWidth={800} />;
export const Mobile = props => <MediaQuery {...props} maxWidth={575} />;
