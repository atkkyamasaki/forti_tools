<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Form\Tests\Extension\Core\Type;

use Symfony\Component\Intl\Util\IntlTestHelper;

class IntegerTypeTest extends BaseTypeTest
{
    const TESTED_TYPE = 'integer';

    protected function setUp()
    {
        IntlTestHelper::requireIntl($this, false);

        parent::setUp();
    }

    public function testSubmitCastsToInteger()
    {
        $form = $this->factory->create(static::TESTED_TYPE);

        $form->submit('1.678');

        $this->assertSame(1, $form->getData());
        $this->assertSame('1', $form->getViewData());
    }

    public function testSubmitNull($expected = null, $norm = null, $view = null)
    {
        parent::testSubmitNull($expected, $norm, '');
    }
}
