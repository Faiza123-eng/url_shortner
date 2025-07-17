import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const shortCode = nanoid(6);
    const newUrl = new Url({ url, shortCode });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOriginalUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: 'Short URL not found' });

    url.accessCount += 1;
    await url.save();
    res.status(200).json(url);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const updated = await Url.findOneAndUpdate(
      { shortCode: req.params.shortCode },
      { url, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Short URL not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const deleted = await Url.findOneAndDelete({ shortCode: req.params.shortCode });
    if (!deleted) return res.status(404).json({ error: 'Short URL not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUrlStats = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: 'Short URL not found' });
    res.status(200).json(url);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
