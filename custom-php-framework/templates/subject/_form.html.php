<?php
/** @var $subject ?\App\Model\Subject */
?>

<div class="form-group">
    <label for="name">Nazwa</label>
    <input type="text" id="name" name="subject[name]" value="<?= $subject ? $subject->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Opis</label>
    <textarea id="description" name="subject[description]"><?= $subject ? $subject->getDescription() : '' ?></textarea>
</div>

<div class="form-group">
    <input type="submit" value="Zapisz">
</div>
