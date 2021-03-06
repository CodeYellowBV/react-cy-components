import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import IconCheckBox from '../../general/icon/IconCheckBox';
import IconCheckBoxOutlineBlank from '../../general/icon/IconCheckBoxOutlineBlank';

import {
    Dropdown,
    DropdownList,
    DropdownItem,
    DropdownActionBar,
    DropdownSearch,
} from './styles';
import Checkbox from '../Checkbox';
import { Button } from '../../general/Button';

export default class MultipickDropdown extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        value: PropTypes.array.isRequired,
        filteredOptions: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        searchAppearsAfterCount: PropTypes.number.isRequired,
        searchValue: PropTypes.string.isRequired,
        onSearchChange: PropTypes.func.isRequired,
        searchPlaceholder: PropTypes.string,
        selectAllText: PropTypes.string,
        selectNoneText: PropTypes.string,
        noBatchSelect: PropTypes.bool,
    };

    static defaultProps = {
        searchValue: '',
    };

    handleItemChange = (value, checked) => {
        const newValue = this.props.value.slice();
        const valueIndex = newValue.indexOf(value);
        if (valueIndex >= 0) {
            if (checked) {
                newValue.splice(valueIndex, 1);
            }
        } else if (!checked) {
            newValue.push(value);
        }
        this.props.onChange(newValue);
    };

    handleSearchChange = (name, value) => {
        this.props.onSearchChange(value);
    };

    selectAll = () => {
        this.props.onChange(this.props.options.map(item => item.value));
    };

    selectNone = () => {
        this.props.onChange([]);
    };

    renderItem = item => {
        const checked = this.props.value.indexOf(item.value) >= 0;
        return (
            <DropdownItem key={item.value} checked={checked}>
                <Checkbox
                    onChange={() => this.handleItemChange(item.value, checked)}
                    value={checked}
                    label={item.label}
                />
            </DropdownItem>
        );
    };

    renderSearch = () => {
        const { searchValue, searchPlaceholder } = this.props;
        return (
            <DropdownSearch
                type="search"
                autoFocus
                value={searchValue}
                onChange={this.handleSearchChange}
                placeholder={
                    searchPlaceholder || t('form.multiPick.searchPlaceholder')
                }
            />
        );
    };

    render() {
        const {
            options,
            selectAllText,
            selectNoneText,
            searchAppearsAfterCount,
            noBatchSelect,
        } = this.props;
        return (
            <Dropdown>
                {options.length >= searchAppearsAfterCount
                    ? this.renderSearch()
                    : null}
                {!noBatchSelect &&
                    <DropdownActionBar>
                        <Button onClick={this.selectNone} tone="light">
                            <IconCheckBoxOutlineBlank/>
                            {selectNoneText || t('form.multiPick.selectNoneButton')}
                        </Button>
                        <Button onClick={this.selectAll} tone="light">
                            <IconCheckBox/>
                            {selectAllText || t('form.multiPick.selectAllButton')}
                        </Button>
                    </DropdownActionBar>
                }
                <DropdownList>
                    {this.props.filteredOptions.map(this.renderItem)}
                </DropdownList>
            </Dropdown>
        );
    }
}
