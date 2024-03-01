# User Type Block - Readme

## Overview

This README provides an overview of the User Type Block, describing its initialization and the possible scenarios that 
can occur during initialization.

## Initialization Scenarios

When initializing a new User Type Block, the following scenarios might be possible:

1. **Neither `allowedFields`, nor `disallowedFields` is given**
    - All fields are available for the User Type Block.

2. **`allowedFields` is given, but `disallowedFields` is not**
    - Only the fields specified in `allowedFields` will be displayed for the User Type Block.

3. **`allowedFields` is not given, but `disallowedFields` is**
    - All fields are available for the User Type Block, except for the ones listed in `disallowedFields`.

4. **Both `allowedFields` and `disallowedFields` are given**
    - `disallowedFields` takes precedence - if a field is specified in both `allowedFields` and `disallowedFields`, it 
    - will be disallowed for the User Type Block.

## Must-Have Fields

Must-have fields are fields  given in `mustHave` array that will be checked and must not be changed. If `allowedFields` 
is given, must-have fields must be included in the list of allowed fields.

## Disallowed Fields

Disallowed fields will still appear in the outputted JSON, but with a falsy value.