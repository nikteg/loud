import React from "react";

import "./style.styl";

export function User(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-User">
      <path d="M9 11.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z" />
    </svg>
  );
}

export function Settings(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Settings">
      <path d="M14.59 9.535c-0.839-1.454-0.335-3.317 1.127-4.164l-1.572-2.723c-0.449 0.263-0.972 0.414-1.529 0.414-1.68 0-3.042-1.371-3.042-3.062h-3.145c0.004 0.522-0.126 1.051-0.406 1.535-0.839 1.454-2.706 1.948-4.17 1.106l-1.572 2.723c0.453 0.257 0.845 0.634 1.123 1.117 0.838 1.452 0.336 3.311-1.12 4.16l1.572 2.723c0.448-0.261 0.967-0.41 1.522-0.41 1.675 0 3.033 1.362 3.042 3.046h3.145c-0.001-0.517 0.129-1.040 0.406-1.519 0.838-1.452 2.7-1.947 4.163-1.11l1.572-2.723c-0.45-0.257-0.839-0.633-1.116-1.113zM8 11.24c-1.789 0-3.24-1.45-3.24-3.24s1.45-3.24 3.24-3.24c1.789 0 3.24 1.45 3.24 3.24s-1.45 3.24-3.24 3.24z" />
    </svg>
  );
}

export function Logout(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Logout">
      <path d="M14 10v-2h-5v-2h5v-2l3 3zM13 9v4h-5v3l-6-3v-13h11v5h-1v-4h-8l4 2v9h4v-3z" />
    </svg>
  );
}

export function Plus(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Plus">
      <path d="M12.8 8c0 0.442-0.038 0.8-0.481 0.8h-3.519v3.519c0 0.442-0.358 0.481-0.8 0.481s-0.8-0.039-0.8-0.481v-3.519h-3.519c-0.442 0-0.481-0.358-0.481-0.8s0.039-0.8 0.481-0.8h3.519v-3.519c0-0.442 0.358-0.481 0.8-0.481s0.8 0.038 0.8 0.481v3.519h3.519c0.442 0 0.481 0.358 0.481 0.8z" />
    </svg>
  );
}

export function Bin(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Bin">
      <path d="M2 5v10c0 0.55 0.45 1 1 1h9c0.55 0 1-0.45 1-1v-10h-11zM5 14h-1v-7h1v7zM7 14h-1v-7h1v7zM9 14h-1v-7h1v7zM11 14h-1v-7h1v7z" />
      <path d="M13.25 2h-3.25v-1.25c0-0.412-0.338-0.75-0.75-0.75h-3.5c-0.412 0-0.75 0.338-0.75 0.75v1.25h-3.25c-0.413 0-0.75 0.337-0.75 0.75v1.25h13v-1.25c0-0.413-0.338-0.75-0.75-0.75zM9 2h-3v-0.987h3v0.987z" />
    </svg>
  );
}

export function Music(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Music">
      <path d="M13.6 0.8l-0.002 10.4c0 0.994-1.041 2.4-2.998 2.4-0.994 0-1.8-0.522-1.8-1.5 0-1.271 1.156-2.040 2.4-2.040 0.346 0 0.603 0.047 0.8 0.098v-5.867l-5.6 1.018v7.49h-0.002c0 0.994-1.041 2.4-2.998 2.4-0.994 0-1.8-0.522-1.8-1.5 0-1.271 1.156-2.040 2.4-2.040 0.346 0 0.603 0.047 0.8 0.098v-9.358l8.8-1.6z" />
    </svg>
  );
}

export function Search(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Search">
      <path d="M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
    </svg>
  );
}

export function Down(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Down">
      <path d="M3.613 6.038c0.349-0.357 0.834-0.385 1.261 0l3.126 2.998 3.126-2.998c0.426-0.385 0.913-0.357 1.259 0 0.349 0.356 0.326 0.958 0 1.292-0.325 0.334-3.756 3.602-3.756 3.602-0.174 0.178-0.402 0.268-0.63 0.268s-0.456-0.090-0.631-0.268c0 0-3.43-3.267-3.756-3.602s-0.349-0.936 0-1.292z" />
    </svg>
  );
}

export function Play(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Play">
      <path d="M4.5 2l10 6-10 6z" />
    </svg>
  );
}

export function Pause(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Pause">
      <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" />
    </svg>
  );
}

export function Home(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Home">
      <path d="M14.938 8.8h-1.338v4.8c0 0.356-0.155 0.8-0.8 0.8h-3.2v-4.8h-3.2v4.8h-3.2c-0.645 0-0.8-0.444-0.8-0.8v-4.8h-1.338c-0.478 0-0.376-0.259-0.048-0.598l6.419-6.426c0.156-0.162 0.361-0.242 0.566-0.25 0.206 0.008 0.41 0.087 0.566 0.25l6.418 6.425c0.329 0.34 0.431 0.599-0.047 0.599z" />
    </svg>
  );
}

export function Browse(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Browse">
      <path d="M14.724 2.239c-0.090-0.352-0.525-0.639-0.968-0.639h-11.512c-0.444 0-0.879 0.287-0.968 0.639l-0.161 0.961h13.769l-0.16-0.961zM15.53 4h-15.060c-0.274 0-0.487 0.235-0.462 0.508l0.738 9.335c0.030 0.315 0.296 0.557 0.613 0.557h13.281c0.318 0 0.582-0.242 0.613-0.557l0.738-9.335c0.026-0.273-0.188-0.508-0.462-0.508zM9.554 10.017c-0.102 0.212-0.206 0.223-0.162 0 0.117-0.577 0.038-1.815-0.834-1.953v2.635c0 0.539-0.249 1.010-0.909 1.222-0.642 0.205-1.359-0.009-1.526-0.469s0.209-1.021 0.842-1.251c0.354-0.129 0.763-0.162 1.039-0.056v-3.746h0.555c-0.001 1.306 2.254 1.020 0.995 3.617z" />
    </svg>
  );
}

export function Queue(props) {
  return (
    <svg viewBox="1 2 21 22" className="Icon Icon-Queue">
      <path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z" />
    </svg>
  );
}

export function Speaker(props) {
  return (
    <svg viewBox="0 0 16 16" className="Icon Icon-Speaker">
      <path d="M13.907 14.407c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.369-1.369 2.123-3.19 2.123-5.127s-0.754-3.757-2.123-5.127c-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.653 1.653 2.563 3.85 2.563 6.187s-0.91 4.534-2.563 6.187c-0.146 0.146-0.338 0.22-0.53 0.22zM11.243 12.993c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 2.047-2.047 2.047-5.378 0-7.425-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773c-0.146 0.146-0.338 0.22-0.53 0.22v0zM8.578 11.578c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.267-1.267 1.267-3.329 0-4.596-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.852 1.852 1.852 4.865 0 6.718-0.146 0.146-0.338 0.22-0.53 0.22z" />
      <path d="M6.5 15c-0.13 0-0.258-0.051-0.354-0.146l-3.854-3.854h-1.793c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5h1.793l3.854-3.854c0.143-0.143 0.358-0.186 0.545-0.108s0.309 0.26 0.309 0.462v13c0 0.202-0.122 0.385-0.309 0.462-0.062 0.026-0.127 0.038-0.191 0.038z" />
    </svg>
  );
}
