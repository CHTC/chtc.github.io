
# Staff List Submodule

Welcome to the `staff-list` submodule. This submodule is designed to manage and display information about the staff members in a structured and consistent manner. It includes details such as names, roles, images, and affiliations. To ensure uniformity and ease of management, please adhere to the guidelines provided below.

## File Naming Conventions

### YML Files

Each staff member should have a corresponding `.yml` file named according to the following convention:

```
firstName_lastName.yml
```

This file contains structured data about the staff member, such as their name, image path, title, and more.

### Image Files

Staff member images should be stored in the `images/` directory and named following this convention:

```
images/firstName_lastName.jpg
```

or

```
images/firstName_lastName.png
```

Please ensure that the image file extension matches the one referenced in the staff member's `.yml` file.

## YML File Format

Each `.yml` file should adhere to the following structure:

```yaml
name: "John Doe"
image: "images/john_doe.jpg"
title: "Lead Software Engineer"
website: "https://johndoe.com"
institution: "Morgridge Institute for Research"
promoted: true
weight: 3
description: "John Doe is a brilliant software engineer."
status: Staff
organizations:
  - path
  - chtc
  - osg
  - pelican
```

### Fields Explanation

- `name`: Full name of the staff member.
- `image`: Relative path to the staff member's image within the submodule.
- `title`: The staff member's role or title within the organization.
- `website`: (Optional) A URL to the staff member's professional or personal webpage.
- `institution`: The name of the institution to which the staff member belongs.
- `promoted`: (Optional) A boolean value indicating if the staff member is part of the executive team. Only use if true.
- `weight`: (Optional) Used to order executive staff members if `promoted` is set to `true`.
- `description`: (Optional) A brief description or bio of the staff member.
- `status`: Indicates the current status of the staff member within the organization (e.g., Leadership, Staff, Student, Past).
- `organizations`: Lists the organizations the staff member is associated with. If the correct values are not provided, the staff member will not be displayed on the respective organization's website.

## Additional Organization-Specific Information

For staff members associated with specific organizations (e.g., `osg`, `chtc`, `pelican`), additional information can be provided under `osg/chtc/pelican/path` with an alternative title for that organization. 
See below for the example:

```yaml
name: "John Doe"
image: "images/john_doe.jpg"
title: "Lead Software Engineer"
osg: 
    title: "Software Engineer"
status: Staff
organizations:
  - path
  - chtc
  - osg
```

## Contribution Guidelines

- Ensure all information is accurate and up-to-date.
- Images should be clear and professional, preferably in a uniform size or aspect ratio.
- Follow the file naming conventions strictly to avoid any inconsistencies.
- For any updates or changes, please submit a pull request for review.

Thank you for contributing to the `staff-list` submodule and helping maintain a consistent and professional presentation of our staff members.