# TED talk API

## Description
This is an API which returns TED talk related data. The data is read from tedTalkDetailed.json file.\
Data is taken from https://www.kaggle.com/ashishjangra27/ted-talks \
id, img, description and relatedVideos key values added by scraping each talks url using axios and cheerio \
The URL: http://ted-talk-api.herokuapp.com

## Used Tools
- Node.js
- Express.js
- Axios
- Cheerio

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
  &emsp;"id": "88219",\
  &emsp;"img": "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/4ffd7a41-8d16-4fc1-9991-90235086d436/OzawaBineshiAlbert_2021W-1350x675.jpg?", \
  &emsp;"description": "We can't rely on those who created climate change to fix it, says climate justice organizer Ozawa Bineshi Albert. An Indigenous woman     living in the heart of oil and gas country in the US, she's observed an alarming disconnect between empty promises made by corporations and the actual needs of communities on the ground. In this call for urgency and a shift in values, she advocates for climate policy to center frontline leaders and outlines some grassroots-led projects -- from water protection efforts in Minnesota to off-grid solar power in Arizona -- that have already sparked real change.",\
  &emsp;"relatedVideos": [\
  &emsp;&emsp;{\
        &emsp;&emsp;&emsp;"__typename": "Video", \
        &emsp;&emsp;&emsp;"slug": "hindou_oumarou_ibrahim_indigenous_knowledge_meets_science_to_take_on_climate_change", \
        &emsp;&emsp;&emsp;"id": "60914" \
      &emsp;&emsp;},\
      &emsp;&emsp;{\
        &emsp;&emsp;&emsp;"__typename": "Video",\
        &emsp;&emsp;&emsp;"slug": "nemonte_nenquimo_the_forest_is_our_teacher_it_s_time_to_respect_it",\
        &emsp;&emsp;&emsp;"id": "81757"\
      &emsp;&emsp;},\
    &emsp;]\
}
