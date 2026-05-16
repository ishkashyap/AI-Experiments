# Dejure Law Office - Admin Panel Documentation

## Table of Contents
1. [Getting Started](#getting-started)
2. [Login Credentials](#login-credentials)
3. [Dashboard Overview](#dashboard-overview)
4. [Content Management](#content-management)
   - [About Page Tab](#about-page-tab)
   - [Content Tab](#content-tab)
   - [Footer Tab](#footer-tab)
5. [Office Branches](#office-branches)
6. [Announcements](#announcements)
7. [Blog Management](#blog-management)
8. [Bookings Management](#bookings-management)
9. [Contact Submissions](#contact-submissions)
10. [Quick Reference](#quick-reference)

---

## Getting Started

### Accessing the Admin Panel
1. Open your browser and navigate to: `http://yoursite.com/admin.html`
2. You will see the login screen

### System Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Stable internet connection

---

## Login Credentials

| Field | Default Value |
|-------|---------------|
| Username | `admin` |
| Password | `admin123` |

**Important:** After first login, change your password immediately for security.

---

## Dashboard Overview

The Admin Panel uses a tab-based navigation system. Each tab manages different aspects of your website:

| Tab | Purpose |
|-----|---------|
| About Page | Edit About and Home page content |
| Content | Manage all website content |
| Offices | Add/edit office locations |
| Announcements | Post important notices |
| Footer | Edit footer information |
| Blogs | Manage blog posts |
| Bookings | View/manage appointments |
| Contacts | View contact form submissions |

---

## Content Management

### About Page Tab

The About Page tab allows you to edit content on both the **About** and **Home** pages.

#### Hero Image
- **Image URL:** Enter a full URL (e.g., `https://example.com/image.jpg`)
- **Upload:** Or upload an image file directly
- Click **Save Image** to apply

#### Our Story Section
| Field | Description |
|-------|-------------|
| Title | Main heading for the story section |
| First Paragraph | Opening paragraph text |
| Second Paragraph | Additional story content |

Click **Save Story** when done.

#### Our Mission Section
- **Mission Text:** Edit the firm's mission statement
- Supports multi-line text

#### Experience & Expertise Cards
Edit the four expertise cards displayed on the About page:

| Card | Title Field | Description Field |
|------|-------------|-------------------|
| 1 | expertiseTitle1 | expertiseDesc1 |
| 2 | expertiseTitle2 | expertiseDesc2 |
| 3 | expertiseTitle3 | expertiseDesc3 |
| 4 | expertiseTitle4 | expertiseDesc4 |

#### Core Values
Edit the four core values displayed in the sidebar on the About page:

| Value | Field ID |
|-------|----------|
| Value 1 | coreValue1 |
| Value 2 | coreValue2 |
| Value 3 | coreValue3 |
| Value 4 | coreValue4 |

#### Home Page Content

**Hero Section:**
| Field | Description |
|-------|-------------|
| Hero Tagline | Small text above title |
| Hero Title Line 1 | First line of main title |
| Hero Title Line 2 | Second line of main title |
| Hero Subtitle | Description text below title |
| Stat 1 | First statistic (e.g., "25+ Years Practice") |
| Stat 2 | Second statistic |
| Stat 3 | Third statistic |

**About Preview Image:**
- Enter URL or upload image
- Used in the "About Preview" section on home page

**"The Firm" Section:**
| Field | Description |
|-------|-------------|
| Tagline | Small label above title |
| Title | Section heading |
| First Paragraph | Description text |
| Bullet Point 1 | First bullet list item |
| Bullet Point 2 | Second bullet list item |
| Bullet Point 3 | Third bullet list item |

**Practice Areas Section:**
| Field | Description |
|-------|-------------|
| Tagline | Small label |
| Title | Section heading |

**Service Cards (1-4):**
| Field | Description |
|-------|-------------|
| Title | Service name |
| Description | Service description |

#### Team Members

**Adding a Team Member:**
1. Click the **Add Team Member** button
2. Fill in the form:
   - **Name:** Team member's full name
   - **Position:** Job title (e.g., "Senior Partner")
   - **Description:** Brief bio or expertise
   - **Image URL:** Or upload an image file
3. Click **Save Team Member**

**Editing a Team Member:**
1. Find the member in the table
2. Click **Edit**
3. Modify the details
4. Click **Save Team Member**

**Deleting a Team Member:**
1. Find the member in the table
2. Click **Delete**
3. Confirm the deletion

---

### Content Tab

The Content tab provides a unified interface for all website content.

#### Adding New Content
1. Click **Add Content**
2. Fill in the form:
   - **Page:** Select the target page (home, about, services, contact, booking, blog)
   - **Section:** Unique identifier (e.g., `hero-title`, `footer-address`)
   - **Type:** `text` or `image`
   - **Content:** Text content or image URL
   - **Image:** Optionally upload an image file
3. Click **Save Content**

#### Editing Existing Content
1. Find the content in the table
2. Click **Edit**
3. Modify the values
4. Click **Save Content**

#### Deleting Content
1. Find the content in the table
2. Click **Delete**
3. Confirm the deletion

#### Content Section Reference

**Home Page (`home`):**
| Section ID | Element |
|------------|---------|
| hero-tagline | Hero tagline text |
| hero-title-1 | First title line |
| hero-title-2 | Second title line |
| hero-subtitle | Hero description |
| stat-1, stat-2, stat-3 | Statistics |
| about-image | About preview image |
| firm-tagline | Firm section tagline |
| firm-title | Firm section title |
| firm-para1 | Firm paragraph |
| firm-bullet1, firm-bullet2, firm-bullet3 | Bullet points |
| services-tagline | Services tagline |
| services-title | Services title |
| service-1-title to service-4-title | Service titles |
| service-1-desc to service-4-desc | Service descriptions |

**About Page (`about`):**
| Section ID | Element |
|------------|---------|
| image | Hero image |
| story-title | Story section title |
| story-para1, story-para2 | Story paragraphs |
| mission-text | Mission statement |
| expertise-title-1 to expertise-title-4 | Expertise card titles |
| expertise-desc-1 to expertise-desc-4 | Expertise card descriptions |
| core-value-1 to core-value-4 | Core values list |

**Booking Page (`booking`):**
| Section ID | Element |
|------------|---------|
| note-1 | Important note 1 |
| note-2 | Important note 2 |
| note-3 | Important note 3 |
| note-4 | Important note 4 |

**Global/Footer (`global`):**
| Section ID | Element |
|------------|---------|
| footer-address | Footer address |
| footer-phone | Footer phone number |
| footer-email | Footer email |
| footer-hours | Working hours |
| footer-description | Footer description text |

---

### Footer Tab

Edit footer content for the entire website:

| Field | Description |
|-------|-------------|
| Address | Physical address |
| Phone | Contact phone number |
| Email | Contact email |
| Working Hours | Business hours |
| Description | Footer tagline/description |
| About Link | Link to About page |
| Services Link | Link to Services page |

Click **Save Footer Settings** to apply changes.

---

## Office Branches

### Adding an Office
1. Click **Add Office**
2. Fill in the form:
   - **Office Name:** Branch name
   - **Phone:** Contact number
   - **Address:** Full address
   - **Email:** Contact email
   - **Latitude/Longitude:** Map coordinates (optional)
   - **Main Office:** Check if this is the primary location
3. Click **Save Office**

### Managing Offices
- **Edit:** Modify office details
- **Delete:** Remove an office branch

---

## Announcements

Create important notices, holiday announcements, or emergency updates.

### Creating an Announcement
1. Click **New Announcement**
2. Fill in the form:
   - **Title:** Announcement headline
   - **Type:** Select type:
     - `holiday` - For holidays
     - `emergency` - For urgent notices
     - `notice` - General notices
     - `court` - Court-related updates
   - **Content:** Full announcement text
   - **Active:** Check to display on website
3. Click **Save Announcement**

### Managing Announcements
- **Edit:** Modify announcement details
- **Delete:** Remove an announcement

---

## Blog Management

### Creating a Blog Post
1. Click **New Blog Post**
2. Fill in the form:
   - **Blog Title:** Post headline
   - **Author:** Author name
   - **Blog Content:** Full article text
   - **Featured Image:** Upload a cover image
3. Click **Save Blog Post**

### Blog Actions
- **Edit:** Modify the blog post
- **Delete:** Remove a blog post
- **View:** Read the full post content

---

## Bookings Management

### Viewing Bookings
The Bookings tab displays all appointment requests:

| Column | Description |
|--------|-------------|
| Name | Client's name and contact info |
| Service | Legal service requested |
| Date & Time | Preferred appointment time |
| Status | Current booking status |
| Actions | View details |

### Updating Booking Status
1. Find the booking in the table
2. Change the status dropdown:
   - `pending` - Awaiting confirmation
   - `confirmed` - Appointment confirmed
   - `completed` - Service delivered
   - `cancelled` - Appointment cancelled

### Viewing Case Details
Click **View Notes** to see the client's message/case details.

---

## Contact Submissions

### Viewing Contacts
The Contacts tab displays all form submissions from the Contact page:

| Column | Description |
|--------|-------------|
| Name | Sender's name |
| Email | Sender's email |
| Phone | Sender's phone |
| Subject | Query subject |
| Message | Full message |
| Date | Submission date |

### Managing Contacts
- **View:** Read full message
- **Delete:** Remove submission

---

## Quick Reference

### File Size Limits
- Images: Max 5MB recommended
- Supported formats: JPG, PNG, GIF, WebP

### API Endpoints (Reference)
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/login | POST | Login |
| /api/auth/logout | POST | Logout |
| /api/website-content | GET/POST | Content CRUD |
| /api/website-content/:id | PUT/DELETE | Content update/delete |
| /api/blogs | GET/POST | Blog posts |
| /api/bookings | GET | View bookings |
| /api/contacts | GET/DELETE | Contact submissions |
| /api/announcements | GET/POST | Announcements |
| /api/office-branches | GET/POST | Office management |
| /api/team-members | GET/POST | Team management |

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Check credentials; clear browser cache |
| Content not updating | Hard refresh (Ctrl+F5); check if saved |
| Images not loading | Verify URL format; check file path |
| Form submissions not working | Check API connection; verify server is running |

### Security Best Practices
1. Change default admin password regularly
2. Log out when done
3. Don't share login credentials
4. Monitor bookings and contacts for spam

---

## Support

For technical support, contact your web developer or system administrator.

**Version:** 1.0.0
**Last Updated:** 2026