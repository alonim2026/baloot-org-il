// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const linkSchema = z.object({
  title: z.string().optional(),
  url:   z.string(),
}).optional();

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date(),
    modified: z.coerce.date().optional(),
    topImage: z.string().optional(),
    excerpt:  z.string().optional(),
    author:   z.string().optional(),
    tags:     z.array(z.string()).optional(),
    wpId:     z.string().optional(),
    wpType:   z.string().optional(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date().optional(),
    modified: z.coerce.date().optional(),
    topImage: z.string().optional(),
    excerpt:  z.string().optional(),
    wpId:     z.string().optional(),
    wpType:   z.string().optional(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date().optional(),
    topImage: z.string().optional(),
    excerpt:  z.string().optional(),
    wpId:     z.string().optional(),
    wpType:   z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    date:     z.coerce.date().optional(),
    modified: z.coerce.date().optional(),
    topImage: z.string().optional(),
    excerpt:  z.string().optional(),
    status:   z.string().optional(),
    wpId:     z.string().optional(),
    wpType:   z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date().optional(),
    eventDate:   z.string().optional(),
    location:    z.string().optional(),
    description: z.string().optional(),
    link:        linkSchema,
    topImage:    z.string().optional(),
    wpId:        z.string().optional(),
    wpType:      z.string().optional(),
  }),
});

const bannerSchema = z.object({
  kind:  z.string().optional(),
  title: z.string(),
  text:  z.string(),
  image: z.string().optional(),
  link:  linkSchema,
});

const teamMemberSchema = z.object({
  name:        z.string(),
  occupation:  z.string().optional(),
  description: z.string().optional(),
  image:       z.string().optional(),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    layout:   z.string().optional(),
    wpId:     z.string().optional(),
    wpType:   z.string().optional(),
    hero: z.object({
      title:           z.string(),
      subtitle:        z.string().optional(),
      backgroundImage: z.string().optional(),
      backgroundVideo: z.string().optional(),
    }).optional(),
    intro:      z.string().optional(),
    introImage: z.string().optional(),
    banners:    z.array(bannerSchema).optional(),
    upcomingEvents: z.array(z.object({
      title:       z.string(),
      date:        z.string().optional(),
      description: z.string().optional(),
      link:        linkSchema,
    })).optional(),
    eventsBackgroundImage: z.string().optional(),
    donations: z.object({
      text:       z.string().optional(),
      buttonText: z.string().optional(),
      buttonLink: linkSchema,
      image:      z.string().optional(),
    }).optional(),
    sideButtons: z.record(z.object({
      url:    z.string().optional(),
      target: z.string().optional(),
    })).optional(),
    footerText: z.string().optional(),
    heading:   z.string().optional(),
    heroImage: z.string().optional(),
    banner:    z.object({
      text:            z.string().optional(),
      image:           z.string().optional(),
      backgroundColor: z.string().optional(),
      buttonText:      z.string().optional(),
      buttonLink:      linkSchema,
    }).optional(),
    teamTitle: z.string().optional(),
    team:      z.array(teamMemberSchema).optional(),
  }),
});

export const collections = { blog, articles, guides, projects, events, pages };
