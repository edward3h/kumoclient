This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). [See generic Readme](Create_React_App_README.md).

## Overview
This is a web client to control Mitsubishi heat pumps. The Kumo Cloud app supplied by Mitsubishi is slow and only available for iOs and Android devices.

## Dependencies
Depends on the API gateway from the [kumojs](https://github.com/sushilks/kumojs) project. (Currently it depends on a bug fix in my fork of that project).

In dev mode it expects the API server to be running on port 18084, and proxies to that. When deployed it just expects the API to be mapped to be in the same server i.e. to be callable with relative links.

## Design Goals
I had these goals in mind when designing the client:

 * Keep it simple - only display the options we actually use.
 * Minimise interactions - I want to turn off all units in the house with 2 clicks.
 * Unsecured - it's only available on the internal network in the house: don't secure for external use.
 * Work on mobile and desktop devices.