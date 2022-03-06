# TED talk API

## Description
This is an API which returns TED talk related data.
The URL: http://ted-talk-api.herokuapp.com

## How to use

### Parameters
keyword - one word keyword to fetch TED talk objects which its title contains keyword

views - number to fetch TED talk objects which its views is greater than entered views

likes - number to fetch TED talk objects which its likes is greater than entered likes

### To Fetch All Data
http://ted-talk-api.herokuapp.com/talks
### To Fetch Filtered Data
http://ted-talk-api.herokuapp.com/talks?keyword={enter_a_keyword}&views={enter_a_view_count}&likes={enter_a_like_count}
### Sample Data
{\
  &emsp;"title":"Climate action needs new frontline leadership",\
  &emsp;"author":"Ozawa Bineshi Albert",\
  &emsp;"date":"December 2021",\
  &emsp;"views":404000,\
  &emsp;"likes":12000,\
  &emsp;"link":"https://ted.com/talks/ozawa_bineshi_albert_climate_action_needs_new_frontline_leadership" \
}
