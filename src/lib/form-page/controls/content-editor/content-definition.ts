// import Header from "$lib/form-page/controls/content-editor/components/blocks/header/header";
// import Image from "$lib/form-page/controls/content-editor/components/blocks/image/image";
// import Text from "$lib/form-page/controls/content-editor/components/blocks/text/text";
// import Gallery from "$lib/form-page/controls/content-editor/components/blocks/gallery/gallery";
// import Usercard from "$lib/form-page/controls/content-editor/components/blocks/usercard/usercard";
// import FileUpload from "$lib/form-page/controls/content-editor/components/blocks/file/file";
// import DataTable from "$lib/form-page/controls/content-editor/components/blocks/data-table/data-table";
// import Graph from "$lib/form-page/controls/content-editor/components/blocks/graph/graph";
// import VisualTable from "$lib/form-page/controls/content-editor/components/blocks/visual-table/visual-table";
// import RichText from "$lib/form-page/controls/content-editor/components/blocks/rich-text/rich-text";
// import Quote from "$lib/form-page/controls/content-editor/components/blocks/quote/quote";
// import Video from "$lib/form-page/controls/content-editor/components/blocks/video/video";
// import Event from "$lib/form-page/controls/content-editor/components/blocks/event/event";
// import Location from "$lib/form-page/controls/content-editor/components/blocks/location/location";
//
// export let blocks = [{
//     "essay": new Text("Essay", "card-text", {
//         minWords: 120,
//         maxWords: 150
//     }),
//     "event": new Event("Event", "calendar-event"),
//     "file": new FileUpload("File", "file-earmark"),
//     "gallery": new Gallery("Gallery", "images"),
//     'graph': new Graph('Graph', "graph-up"),
//     "header": new Header("Header", "hash", {
//         maxLength: 40
//     }),
//     "image": new Image("Image", "card-image"),
//     "lead": new Text("Lead", "card-text", {
//         maxLength: 500
//     }),
//     "location": new Location("Location", "pin-map-fill"),
//     "longtext": new Text("Long", "justify", {
//         minLength: 10000
//     }),
//     "quote": new Quote("Quote", "chat-right-quote"),
//     "richtext": new RichText("Rich Text", "file-richtext"),
//     "table": new DataTable("Table", "table"),
//     "text": new Text("Text", "card-text", {
//         maxLength: 2000
//     }),
//     "user": new Usercard("User", "person-badge", {
//         mustHave: ["name"],
//         allowedFields: ["name", "email"]
//     }),
//     // "video": new Video("Video", "camera-video"),
//     // "visual": new VisualTable("Visual", "file-spreadsheet")
// }]