import React  from 'react';
import Mozaik from 'mozaik/browser';
import github from 'mozaik-ext-github';


const MozaikComponent = Mozaik.Component.Mozaik;
const ConfigActions   = Mozaik.Actions.Config;

Mozaik.Registry.addExtensions({ github });

React.render(<MozaikComponent/>, document.getElementById('mozaik'));

ConfigActions.loadConfig();
