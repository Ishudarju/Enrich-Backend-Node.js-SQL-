const Slot = require('../Model/slotbook_model');

const slotController = {
  createSlot: async (req, res) => {
    try {
      const result = await Slot.create(req.body);
      res.status(201).json({ message: 'Slot created successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error creating slot', error: error.message });
    }
  },

  getAllSlots: async (req, res) => {
    try {
      const slots = await Slot.getAll();
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving slots', error: error.message });
    }
  },

  getSlotById: async (req, res) => {
    const id = req.params.id;
    try {
      const slot = await Slot.getById(id);
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving slot', error: error.message });
    }
  },

  updateSlot: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Slot.update(id, req.body);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Slot not found' });
      }
      res.status(200).json({ message: 'Slot updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating slot', error: error.message });
    }
  },

  deleteSlot: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Slot.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Slot not found' });
      }
      res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting slot', error: error.message });
    }
  },
};

module.exports = slotController;
