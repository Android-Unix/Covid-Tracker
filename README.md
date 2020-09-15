This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

 ### Sitesync Plugin documentation

In case the site sync plugin is updated, refer this documentaion to enable multi lang sync 
support, sync media for custom posts and pages, attachment in acf, syncing newsroom posts.

In order to make sync for these possible, 2 files needs to be changed:
- ApiController.php
- Model.php

*Note:- The Model's ``` build_sync_data ``` function is responsible for constructing the necessary data and apicontroller's ``` push ``` function is executed on target system.*

    - #### To Enable MultiLanguage Sync Support in SiteSync plugin

    Find ``` build_sync_data ``` function. 
    *This function is responsible for preparing data that needs to be sent to remote/target system*
    
    Add these lines of code after query object is created.
    At the time of this documentation **(plugin version 1.6.1)** ,these set of lines:
    ```
    $query = new WP_Query($args);

    if (0 === $query->found_posts)
        return $push_data;

    $push_data['post_data'] = (array) $query->posts[0];
    $push_data['post_data']['post_content'] = str_replace('\\u', '~syncescuni~', $push_data['post_data']['post_content']);

    if (function_exists('get_attached_media'))
        $push_data['post_media'] = get_attached_media('', $post_id);
    ```
    **Code that needs to be added ( inside build_sync_data ):**
    ```
    global $wpdb;
    $sql = "SELECT * from wp_posts where id = $post_id";
    $post_data = $wpdb->get_results($sql);

    $push_data['post_data']['post_title']   = $post_data[0]->post_title;
    $push_data['post_data']['post_excerpt'] = $post_data[0]->post_excerpt;
    $push_data['post_data']['post_name']    = $post_data[0]->post_name;
    $push_data['post_data']['post_content'] = $post_data[0]->post_content;
    ```

    These above set of lines are responsible for multi-lang sync

    - #### To Enable custom posts media transfer and mapping of IDs
    **Steps**
    - **1** Since ID's are used in custom posts and the ID's are assigned to ``` image_link ``` We need to extract the id and send only the ids to the target system.

    We use regex to extract / parse the shortcode and get the ID that's assigned to **image_link**.

    Add these set of lines of code after the multi-lang code you add inside **build_sync_data**

    ```
    // get all image ids from content
    $image_id_urls = array();
    $image_field_types_pattern = array(
        'component_image'              => '/image_link="(.*?)"/',
        'single_image'                 => '/image="(.*?)"/',
        'component_image_group'        => '/image_link%22%3A%22(.*?)%22/',
        'component_mobile_image_group' => '/mobile_image%22%3A%22(.*?)%22/',
    );

    foreach ($image_field_types_pattern as $image_type=>$regex) :
        preg_match_all($regex, $post_data[0]->post_content, $ids);
        $image_id_urls = $this->image_handler(
                $image_type,
                $ids[1],
                $image_id_urls
        );
    endforeach;

    $push_data['post_data']['image_id_urls'] = $image_id_urls;
    ```

    Here we are assigning the ID's to key ``` image_id_urls ``` that will be later used by the target system to map the ID's

    - **2** Using the sent ID's and constructing the mapping.

    #### In order to do this.       